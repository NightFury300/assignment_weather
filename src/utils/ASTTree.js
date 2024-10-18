class Node {
    constructor(type, value, left = null, right = null) {
        this.type = type;  
        this.value = value;
        this.left = left;  
        this.right = right;
    }
}

class ASTTree {
    constructor(rule) {
        rule = `(${rule})`;
        const tokens = this.tokenize(rule);
        this.root = this.createASTTree(tokens);
    }

    tokenize(rule) {
        const tokens = [];
        let token = '';

        for (const char of rule) {
            if (char === '(' || char === ')' || char === ' ') {
                if (token.length > 0) {
                    tokens.push(token);
                    token = '';
                }
                if (char !== ' ') tokens.push(char);
            } else {
                token += char;
            }
        }

        return tokens;
    }

    createASTTree(tokens) {
        const nodes = [];
        const operators = [];
        let i = 0;

        while (i < tokens.length) {
            const token = tokens[i];

            if (token === '(') {
                operators.push(token);
            } else if (token === ')') {
                while (operators.length > 0 && operators[operators.length - 1] !== '(') {
                    const operator = operators.pop();
                    const right = nodes.pop();
                    const left = nodes.pop();
                    const newNode = new Node("operator", operator, left, right);
                    nodes.push(newNode);
                }
                operators.pop();
            } else {
                if (isOperator(token)) {
                    operators.push(token);
                } else if (isComparisonOperator(tokens[i + 1])) {
                    const value = `${token} ${tokens[i + 1]} ${tokens[i + 2]}`;
                    nodes.push(new Node("operand", value));
                    i += 2; 
                } else {
                    nodes.push(new Node("operand", token));
                }
            }
            i++;
        }

        return nodes.pop(); 
    }

    
   /* printAST(node, indent = '') {
        if (node) {
            console.log(indent + node.value);
            this.printAST(node.left, indent + '    '); 
            this.printAST(node.right, indent + '    '); 
        }
    }

    print() {
        this.printAST(this.root);
    }*/
}
function isOperator(token) {
    return token === "AND" || token === "OR";
}

function isComparisonOperator(token) {
    return ["<", ">", "<=", ">=", "==", "="].includes(token);
}
function evaluateCondition(condition, data) {

    const [attribute, operator, target] = condition.split(' ');
    data = JSON.parse(data)
    const value = data[attribute];
 
    
    if(!value)
        throw Error(`${attribute} value is not provided`)
    const parsedTarget = isNaN(target) ? target.replace(/['"]/g, '') : parseFloat(target);
  
    switch (operator) {
      case '>':
        return value > parsedTarget;
      case '<':
        return value < parsedTarget;
      case '>=':
        return value >= parsedTarget;
      case '<=':
        return value <= parsedTarget;
      case '=':
      case '==':
        return value === parsedTarget;
      default:
        throw new APIError(400,`Unknown operator: ${operator}`);
    }
  }
  
function evaluateAST(node, data) {
    if (!node) return false;
  
    if (node.type === 'operand') {
        //console.log(node.value + " : " + evaluateCondition(node.value,data))
      return evaluateCondition(node.value, data);
    }
  
    const leftEval = evaluateAST(node.left, data);
    const rightEval = evaluateAST(node.right, data);
  
    if (node.value === 'AND') {
      return leftEval && rightEval;
    } else if (node.value === 'OR') {
      return leftEval || rightEval;
    }
  
    throw new APIError(400,`Unknown operator: ${node.value}`);
  }
function combineASTs(ast1, ast2) {
    if (ast1.value === ast2.value && isOperator(ast1)) {
        const newLeft = combineASTs(ast1.left, ast2.left);
        const newRight = combineASTs(ast1.right, ast2.right);
        return new Node('operator', ast1.value, newLeft, newRight);
    } else {
        return new Node('operator', 'AND', ast1, ast2);
    }
}
export {ASTTree,evaluateAST,combineASTs}