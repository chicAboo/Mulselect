require('../component/mulselect.scss');
require('../component/mulselect');

const _mulselect = {
    init: function () {
        this.baseMulselect();
        this.chooseAllMulselect();
        this.addMulselect();
        this.chooseCallBack();
    },
    /**
     *  基础下拉多选
     * */
    baseMulselect: function () {
        $('.baseMulselect').MulSelect({
            data: [
                {name: '张三', disable: ''},
                {name: '李四', disable: ''},
                {name: '王五', disable: ''},
                {name: '陈七', disable: ''},
                {name: '猪八', disable: ''},
            ]
        });
    },
    /**
     *  可全选下拉
     * */
    chooseAllMulselect: function () {
        $('.chooseAllMulselect').MulSelect({
            isCheckAll: true,
            data: [
                {name: '张三', disable: ''},
                {name: '李四', disable: ''},
                {name: '王五', disable: ''},
                {name: '陈七', disable: ''},
                {name: '猪八', disable: ''},
            ]
        });
    },
    /**
     *  新增项
     * */
    addMulselect: function () {
        $('.addMulselect').MulSelect({
            isCheckAll: true,
            isShowAdd: true,
            data: [
                {name: '张三', disable: ''},
                {name: '李四', disable: ''},
                {name: '王五', disable: ''},
                {name: '陈七', disable: ''},
                {name: '猪八', disable: ''},
            ]
        });
    },
    /**
     *  选中回调
     * */
    chooseCallBack: function () {
        $('.chooseCallBack').MulSelect({
            isCheckAll: true,
            isShowAdd: true,
            showNumber: 3,
            data: [
                {name: '张三', disable: 'disable'},
                {name: '李四', disable: 'disable'},
                {name: '王五', disable: ''},
                {name: '陈七', disable: ''},
                {name: '猪八', disable: ''},
            ],
            getCheckedValue: function (option, element) {
                console.log(option);
                console.log(element);
            }
        });
    }
};

$(function () {
    _mulselect.init();
});
