### 安装
`npm install`

### 运行
`npm run dev`

### 使用方法

###### 1. 基础下拉多选
```
    $('.baseMulselect').MulSelect({
        data: [
            {name: '张三', disable: ''},
            {name: '李四', disable: ''},
            {name: '王五', disable: ''},
            {name: '陈七', disable: ''},
            {name: '猪八', disable: ''},
        ]
    });
```
`data`数据，disable表示是否禁用，值为disable为禁用状态

###### 2. 可全选下拉
```
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
```
`isCheckAll`启用全选功能，true为启用，默认为false

###### 3. 新增列表项启用
```
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
```
`isShowAdd`启用新增列表项，true为启用，默认为false

###### 4. 选中回调
```
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
```
`showNumber`完整显示的个数；getCheckedValue选中回调

### API
###### 1. 参数
参数|说明|类型|默认值
---|:--:|---:|---
isShowAdd|是否启用新增项|Boolean|false
isCheckAll|是否启用全选功能|Boolean|false
showNumber|选中显示的个数|Number|4
isOpen|是否直接显示下拉|Boolean|false
selectAllText|全选默认文本|string|全选
chooseText|请选择值默认文本|string|请选择值
noDataText|暂无数据默认文本|string|暂无数据
canNotSameName|不能添加同名字段默认文本|string|不能添加同名字段
data:[{name:'', disable: ''}]|列表数据{name列表项名称， disable是否可选，值为disable则不可选}|Array|--

###### 2. 方法
参数|说明
---|:---
getCheckedValue(option, element)|选中回调(option：选中的回调信息，element:下拉多选DOM)
