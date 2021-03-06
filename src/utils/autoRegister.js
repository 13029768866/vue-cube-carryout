import Vue from 'vue'
// 设置不需要自动注册组件列表
const blackList = []
/* 
require.context参数
    directory：说明需要检索的目录
    useSubdirectories：是否检索子目录
    regExp: 匹配文件的正则表达式
*/
const requireComponent = require.context('components', true, /Wzj[A-Z]\w+\.vue$/);
requireComponent.keys().forEach(filename => {
  const componentConfig = requireComponent(filename);
  const start = filename.lastIndexOf('/') + 1;
  const end = filename.lastIndexOf('.');
  const componentName = filename.slice(start, end);
  if (blackList.includes(filename)) {return;}
  // 全局注册组件
  Vue.component(
    componentName,
    // 如果这个组件选项是通过 `export default` 导出的，
    // 那么就会优先使用 `.default`，
    // 否则回退到使用模块的根。
    componentConfig.default || componentConfig
  );
});