"use strict";

var Assert = require("assert");

var XPathLexer = require("xpath-lexer");

var AxisSpecifier = require("../../lib/axis_specifier");

var ExprType = require("../../lib/expr_type");

var NodeType = require("../../lib/node_type");

var Expr = require("../../lib/parsers/expr");

var AbsoluteLocationPathExpr = require("../../lib/parsers/absolute_location_path");

describe("AbsoluteLocationPathExpr", function () {
  describe("parse()", function () {
    it("should parse the trivial absolute location path", function () {
      var ast = AbsoluteLocationPathExpr.parse(Expr, new XPathLexer("/"));

      Assert.deepEqual(ast, {
        type: ExprType.ABSOLUTE_LOCATION_PATH,
        steps: []
      });
    });

    it("should parse more complex absolute location paths", function () {
      var ast = AbsoluteLocationPathExpr.parse(Expr, new XPathLexer("/bar//foo"));

      Assert.deepEqual(ast, {
        type: ExprType.ABSOLUTE_LOCATION_PATH,
        steps: [{
          axis: AxisSpecifier.CHILD,
          test: {
            name: "bar"
          }
        }, {
          axis: AxisSpecifier.DESCENDANT_OR_SELF,
          test: {
            type: NodeType.NODE
          }
        }, {
          axis: AxisSpecifier.CHILD,
          test: {
            name: "foo"
          }
        }]
      });
    });
  });
});
