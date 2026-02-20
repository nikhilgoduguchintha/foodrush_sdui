/**
 * Pure rule evaluation engine.
 * Takes a rule tree (from server JSON) + user context,
 * returns true/false — this is the binary tree the reel described.
 *
 * Supports: all (AND), any (OR), none (NOT), and leaf conditions.
 */

const OPERATORS = {
  eq: (a, b) => a === b,
  neq: (a, b) => a !== b,
  gt: (a, b) => a > b,
  gte: (a, b) => a >= b,
  lt: (a, b) => a < b,
  lte: (a, b) => a <= b,
  in: (a, b) => b.includes(a),
  notIn: (a, b) => !b.includes(a),
  between: (a, [min, max]) => a >= min && a <= max,
};

/** Evaluate a single leaf condition against context */
function evaluateCondition(condition, ctx) {
  const { fact, operator, value } = condition;
  const factValue = ctx[fact];
  const fn = OPERATORS[operator];
  if (!fn) {
    console.warn(`Unknown operator: ${operator}`);
    return false;
  }
  return fn(factValue, value);
}

/** Recursively evaluate a rule node */
export function evaluateRule(node, ctx) {
  if (!node) return true;

  // Leaf node — single condition
  if (node.fact) return evaluateCondition(node, ctx);

  // Composite nodes
  if (node.all) return node.all.every((child) => evaluateRule(child, ctx));
  if (node.any) return node.any.some((child) => evaluateRule(child, ctx));
  if (node.none) return node.none.every((child) => !evaluateRule(child, ctx));

  return true;
}
