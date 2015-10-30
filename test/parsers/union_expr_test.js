"use strict";

var Assert = require("assert");

var XPathLexer = require("xpath-lexer");

var ExprType = require("../../lib/expr_type");

var Expr = require("../../lib/parsers/expr");

var UnionExpr = require("../../lib/parsers/union_expr");

describe("UnionExpr", function () {
  describe("parse()", function () {
    it("should parse union expressions", function () {
      var ast = UnionExpr.parse(Expr, new XPathLexer("1 | 2"));

      Assert.deepEqual(ast, {
        type: ExprType.UNION,
        lhs: {
          type: ExprType.NUMBER,
          number: 1
        },
        rhs: {
          type: ExprType.NUMBER,
          number: 2
        }
      });
    });
  });
});
