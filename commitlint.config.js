/**
 * Commitlint 配置文件
 * 规范 Git 提交信息格式
 *
 * 提交信息格式: <type>(<scope>): <subject>
 *
 * 示例:
 * - feat(用户模块): 添加用户登录功能
 * - fix(订单): 修复订单计算错误
 * - docs(README): 更新项目说明文档
 */
module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    // type 类型定义
    "type-enum": [
      2,
      "always",
      [
        "feat", // 新功能
        "fix", // 修复 bug
        "docs", // 文档变更
        "style", // 代码格式(不影响代码运行的变动)
        "refactor", // 重构(既不是新增功能,也不是修复 bug)
        "perf", // 性能优化
        "test", // 测试相关
        "build", // 构建系统或外部依赖变动
        "ci", // CI 配置文件和脚本变动
        "chore", // 其他不修改 src 或测试文件的变动
        "revert", // 回退之前的 commit
      ],
    ],
    // type 不能为空
    "type-empty": [2, "never"],
    // type 必须小写
    "type-case": [2, "always", "lower-case"],

    // scope 可以为空
    "scope-empty": [0],
    // scope 格式
    "scope-case": [0],

    // subject 不能为空
    "subject-empty": [2, "never"],
    // subject 结尾不能有句号
    "subject-full-stop": [2, "never", "."],
    // subject 格式(关闭大小写限制,支持中文)
    "subject-case": [0],

    // body 前必须有空行
    "body-leading-blank": [1, "always"],
    // body 最大长度(0 表示不限制)
    "body-max-line-length": [0],

    // footer 前必须有空行
    "footer-leading-blank": [1, "always"],

    // header 最大长度
    "header-max-length": [2, "always", 100],
  },
};
