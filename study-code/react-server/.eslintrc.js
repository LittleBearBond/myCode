module.exports = {
    extends: [
        'eslint-config-alloy/react'
    ],
    plugin: ['react-hooks'],
    rules: {
        // ...
        "react-hooks/rules-of-hooks": "error", // 检查 Hook 的规则
        "react-hooks/exhaustive-deps": "warn",// 检查 effect 的依赖
        'no-script-url': 0,
        'semi': 0,
        'eqeqeq': 0,
        'no-tabs': 0,
        "indent": 0,
        'no-param-reassign': 0,
        'typescript/no-namespace': 0, // 是否允许全局挂载类型 eg. window.moz....
        'react/jsx-closing-bracket-location': 0,
        'jsx-a11y/href-no-hash': 0,
        'no-multi-spaces': 1,
        'react/jsx-tag-spacing': 1,
        'react/jsx-boolean-value': 1,
        'react/no-string-refs': 1,
        'react/self-closing-comp': 1,
        'react/sort-comp': 0, // 针对compoenntDidupdate等方法和实例方法的排序问题
        'react/jsx-pascal-case': 1,
        'object-curly-spacing': 0,
        'react/jsx-indent-props': 0,
        'react/jsx-indent': 0,
    }
};
