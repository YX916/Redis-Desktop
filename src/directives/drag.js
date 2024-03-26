import storage from "@/util/storage";
export default (app) => {
    app.directive('drag', {
        mounted(el, bind) {
            const dragDom = el;
            // 返回拖拽元素
            dragDom.style.cursor = "col-resize";
            dragDom.onmousedown = e => {
                const startX = e.clientX;
                let currentWidth = bind.value.width;
                let Max = bind.value.maxWidth;
                let Min = bind.value.minWidth;
                var now;
                document.onmousemove = e => {
                    const endX = e.clientX;
                    let moveLen = startX - endX;
                    now = currentWidth - moveLen;
                    if (now < Min) {
                        now = Min;
                    } else if (now > Max) {
                        now = Max;
                    }
                    bind.value.width = now;
                }
                document.onmouseup = () => {
                    storage.set('siderWidth', now);
                    document.onmousemove = null;
                    document.onmouseup = null;
                }
            }
        }
    })
}