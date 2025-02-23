import { showToast } from "vant";
const colors = {
  买入: "linear-gradient(135deg, #07c160, #06ae56)",
  卖出: "linear-gradient(135deg, #ee0a24, #d50a20)",
  持有: "linear-gradient(135deg, #ff976a, #ff8a5c)",
  观望: "linear-gradient(135deg, #c8c9cc, #b9babd)",
};
let map = {
  1: "重仓",
  2: "中等仓位",
  3: "轻仓",
};
const postionColors = {
  轻仓: "#00C853", // 高亮绿
  中等仓位: "#FFD600", // 荧光黄
  重仓: "#D50000", // 深警示红
};
export const getActionColor = (action: keyof typeof colors) => {
  return colors[action] || "#969799";
};

export const formatStrateOperate = (strateOperate: keyof typeof map) => {
  return map[strateOperate] as keyof typeof postionColors;
};
export const getPositionColor = (strateOperate: keyof typeof map) => {
  let format = formatStrateOperate(strateOperate);

  return postionColors[format] || "#f7f8fa";
};

export const copyText = async (content: string) => {
  try {
    await navigator.clipboard.writeText(content);
    showToast("复制成功");
  } catch (err) {
    handleFallbackCopy(content);
  }
};
export const handleFallbackCopy = (text: string) => {
  // 兼容旧浏览器方案
  const textArea = document.createElement("textarea");
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand("copy");
  document.body.removeChild(textArea);
  showToast("复制成功");
};
