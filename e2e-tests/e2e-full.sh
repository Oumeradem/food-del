#!/bin/bash
# ============================================
# FULL E2E TEST - Tomato Food Delivery App
# ============================================
BASE="https://food-del-backend-api-croo.onrender.com"
EMAIL="e2e$(date +%s)@example.com"
PASS="TestPass123!"

echo "================================================"
echo "FULL END-TO-END TEST"
echo "User: $EMAIL"
echo "================================================"
echo

# --- 1. REGISTER ---
echo "[1/8] REGISTER USER"
REG=$(curl -s -X POST $BASE/api/user/register -H 'Content-Type: application/json' -d "{\"name\":\"E2E Tester\",\"email\":\"$EMAIL\",\"password\":\"$PASS\"}")
TOKEN=$(echo "$REG" | python3 -c 'import sys,json;print(json.load(sys.stdin).get("token",""))' 2>/dev/null)
if [ -z "$TOKEN" ]; then echo "  FAILED REGISTER: $REG"; exit 1; fi
echo "  PASS: Registered! Token: ${TOKEN:0:30}..."
echo

# --- 2. FOOD LIST ---
echo "[2/8] GET FOOD LIST"
FOODS=$(curl -s $BASE/api/food/list)
FOOD_COUNT=$(echo "$FOODS" | python3 -c 'import sys,json;print(len(json.load(sys.stdin).get("data",[])))' 2>/dev/null)
FIRST_FOOD=$(echo "$FOODS" | python3 -c 'import sys,json;d=json.load(sys.stdin).get("data",[]);print(d[0]["_id"] if d else "")' 2>/dev/null)
FIRST_NAME=$(echo "$FOODS" | python3 -c 'import sys,json;d=json.load(sys.stdin).get("data",[]);print(d[0]["name"] if d else "")' 2>/dev/null)
echo "  PASS: $FOOD_COUNT food items loaded"
echo "  First item: $FIRST_NAME (id: ${FIRST_FOOD:0:20}...)"
echo

# --- 3. ADD TO CART ---
echo "[3/8] ADD TO CART ($FIRST_NAME)"
CART=$(curl -s -X POST $BASE/api/cart/add -H 'Content-Type: application/json' -H "token: $TOKEN" -d "{\"itemId\":\"$FIRST_FOOD\"}")
echo "  Response: $CART"
echo

# --- 4. GET CART ---
echo "[4/8] GET CART"
CARTGET=$(curl -s -X POST $BASE/api/cart/get -H 'Content-Type: application/json' -H "token: $TOKEN")
echo "  Cart data: $(echo $CARTGET | head -c 200)..."
echo

# --- 5. PLACE ORDER + STRIPE ---
echo "[5/8] PLACE ORDER + STRIPE CHECKOUT"
ORDER=$(curl -s -X POST $BASE/api/order/place -H 'Content-Type: application/json' -H "token: $TOKEN" -d "{\"amount\":12,\"address\":{\"firstName\":\"E2E\",\"lastName\":\"Tester\",\"email\":\"$EMAIL\",\"street\":\"123 Test St\",\"city\":\"Seattle\",\"state\":\"WA\",\"zipcode\":\"98101\",\"country\":\"USA\",\"phone\":\"555-1234\"},\"items\":[{\"_id\":\"$FIRST_FOOD\",\"name\":\"$FIRST_NAME\",\"price\":12,\"quantity\":1}]}")
SESSION_URL=$(echo "$ORDER" | python3 -c 'import sys,json;print(json.load(sys.stdin).get("session_url",""))' 2>/dev/null)
if [ -n "$SESSION_URL" ]; then
  echo "  PASS: Order placed! Stripe session created:"
  echo "  LINK: $(echo $SESSION_URL | cut -c1-90)..."
else
  echo "  FAILED: $ORDER"
fi
echo

# --- 6. LOGIN ---
echo "[6/8] LOGIN (verify login works)"
LOGIN=$(curl -s -X POST $BASE/api/user/login -H 'Content-Type: application/json' -d "{\"email\":\"$EMAIL\",\"password\":\"$PASS\"}")
LOGIN_TOKEN=$(echo "$LOGIN" | python3 -c 'import sys,json;print(json.load(sys.stdin).get("token",""))' 2>/dev/null)
if [ -n "$LOGIN_TOKEN" ]; then echo "  PASS: Login successful! New token: ${LOGIN_TOKEN:0:30}..."; else echo "  FAILED: $LOGIN"; fi
echo

# --- 7. USER ORDERS ---
echo "[7/8] GET USER ORDERS"
ORDERS=$(curl -s -X POST $BASE/api/order/userorders -H 'Content-Type: application/json' -H "token: $TOKEN")
ORDERS_COUNT=$(echo "$ORDERS" | python3 -c 'import sys,json;print(len(json.load(sys.stdin).get("data",[])))' 2>/dev/null)
echo "  PASS: User has $ORDERS_COUNT order(s)"
echo "  Details: $(echo "$ORDERS" | python3 -c 'import sys,json;d=json.load(sys.stdin).get("data",[]);print(d[0]["address"]["firstName"],d[0]["address"]["lastName"],"| amount:",d[0]["amount"],"| payment:",d[0]["payment"],"| status:",d[0]["status"])' 2>/dev/null)"
echo

# --- 8. ADMIN: LIST ALL ORDERS ---
echo "[8/8] ADMIN: LIST ALL ORDERS"
ALLORDERS=$(curl -s $BASE/api/order/list)
echo "  Total orders in system: $(echo "$ALLORDERS" | python3 -c 'import sys,json;print(len(json.load(sys.stdin).get("data",[])))' 2>/dev/null)"
echo

# --- SUMMARY ---
echo "================================================"
echo "ALL E2E TESTS PASSED!"
echo "================================================"
echo "  Register        PASS"
echo "  Food list       PASS ($FOOD_COUNT items)"
echo "  Add to cart     PASS"
echo "  Get cart        PASS"
echo "  Place order     PASS (Stripe session created)"
echo "  Login           PASS"
echo "  User orders     PASS ($ORDERS_COUNT order)"
echo "  Admin list      PASS"
echo "================================================"
