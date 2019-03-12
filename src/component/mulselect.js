(function ($) {

    /**
     *  下拉多选封装
     * */
    function MulSelect(element, config) {
        this.element = element;
        this.config = {
            isShowAdd: false,                   //是否显示新增项
            isCheckAll: false,                  //是否启用全选功能
            showNumber: 4,                      //选中显示的个数
            isOpen: false,                      //是否直接显示下拉
            selectAllText: '全选',               //全选默认文本
            chooseText: '请选择值',               //请选择值默认文本
            noDataText: '暂无数据',               //暂无数据默认文本
            canNotSameName: '不能添加同名字段',    //不能添加同名字段默认文本
            data: [],                            //下拉数据
            getCheckedValue: function () {},     //获取选中的值
        };
        //扩展默认参数
        if (config && $.isPlainObject(config)) {
            this.config = $.extend({}, this.config, config);
        }
    }

    MulSelect.prototype = {
        init: function () {
            this.create();
            this.showList();
            this.checkedItem();
            this.addItem();
        },
        /**
         *  创建下拉多选
         * */
        create: function () {
            const _this = this,
                {
                    isShowAdd,
                    data,
                    isCheckAll,
                    isOpen,
                    selectAllText,
                    chooseText,
                    noDataText,
                } = _this.config;
            let _html = '';

            const checkAllDisable = data.filter(item => {
                return item.disable.length === 0;
            }).length === 0;

            _html += `
                <div class="mulselect">
                    <button type="button" class="mulselect-btn dropDownToggle" title="${chooseText}" data-toggle="${isOpen ? 'open' : 'close'}">
                        <span class="mulselect-text">${chooseText}</span>
                        <b class="caret"></b>
                    </button>
                    <ul class="mulselect-list ${isOpen ? '' : 'none'}">
            `;


            //是否显示新增栏
            if (isShowAdd) {
                _html += `
                    <li class="mulselect-item input">
                        <input type="text" value="" class="add-col" placeholder="请输入新增项">
                        <button class="btn btn-add">增加</button>
                        <p class="red-font text-center none vilExpression"></p>
                    </li>
                `;
            }

            if (data.length > 0) {

                //是否显示全选
                if (isCheckAll) {
                    _html += `
                        <li class="mulselect-item checked-item ${checkAllDisable ? 'disable' : ''}">
                            <input type="checkbox" name="checkAll" data-type="checkAll">
                            ${selectAllText}
                        </li>
                    `;
                }
                data.forEach(item => {
                    _html += `
                        <li class="mulselect-item checked-item ${item.disable}" title="${item.name}">
                            <input type="checkbox" value="${item.name}" name="mulItem" data-type="item">${item.name}
                        </li>
                    `;
                });
            } else {
                _html += `
                    <li class="mulselect-item text-center">
                       <span class="red-font">${noDataText}</span>
                    </li>
                `;
            }

            _html += `</ul></div>`;

            _this.element.html(_html);

        },
        /**
         *  显示隐藏列表
         * */
        showList: function () {
            const $selector = this.element;

            $selector.off('click').on('click', '.dropDownToggle', function (e) {
                e.stopPropagation();
                const $this = $(this),
                    _toggle = $this.data('toggle');

                $('.dropDownToggle').data('toggle', 'close');
                $('.mulselect-list').hide();
                if (_toggle === 'close') {
                    $this.data('toggle', 'open');
                    $this.addClass('active');
                    $selector.find('.mulselect-list').show();
                } else {
                    $this.data('toggle', 'close');
                    $this.removeClass('active');
                    $selector.find('.mulselect-list').hide();
                }
            });
            $selector.on('click', '.mulselect-list', function (e) {
                e.stopPropagation();
                e.preventDefault();
            });

            $(document).on('click', function () {
                $selector.find('.mulselect-list').hide();
                $selector.find('.dropDownToggle').data('toggle', 'close').removeClass('active');
            });
        },
        /**
         *  全选、反选
         * */
        checkedItem: function () {
            const _this = this,
                $selector = _this.element;

            this.element.on('click', 'input[type="checkbox"]', function (e) {
                e.stopPropagation();
                const $this = $(this),
                    $checkItem = $selector.find("input[name='mulItem']"),
                    $checkAll = $selector.find("input[name='checkAll']"),
                    _dataType = $this.data('type');

                if ($this.is(':checked')) {
                    $this.parent().addClass('checked');
                } else {
                    $this.parent().removeClass('checked');
                }
                if (_dataType === 'checkAll') {
                    if ($this.prop("checked") === true) {
                        $checkItem.prop('checked', true);
                        $checkItem.parent().addClass('checked');
                        $selector.find('.disable').removeClass('checked');
                        $selector.find('.disable input').prop('checked', false);
                    } else {
                        $checkItem.prop('checked', false);
                        $checkItem.parent().removeClass('checked');
                    }
                } else {
                    const ischeckedAll = _this.checkedStatus();

                    //是否全选
                    if (ischeckedAll) {
                        $checkAll.prop('checked', true);
                        $checkAll.parent().addClass('checked');
                    } else {
                        $checkAll.prop('checked', false);
                        $checkAll.parent().removeClass('checked');
                    }

                }

                _this.getCheckedValue();

            });

            _this.element.on('click', '.checked-item', function () {
                $(this).find('input[type="checkbox"]').click();
            });
        },
        /**
         *  是否是全部选中状态
         * */
        checkedStatus: function () {
            let checkedArr = [],
                disableArr = [];
            this.element.find('input[name="mulItem"]').each(function () {

                if ($(this).is(':checked')) {
                    checkedArr.push(1);
                }

                if ($(this).parent().hasClass('disable')) {
                    disableArr.push(2);
                }
            });

            return this.element.find('input[name="mulItem"]').length === checkedArr.length + disableArr.length;
        },
        /**
         *  获取选中状态的值
         * */
        getCheckedValue: function () {
            let _this = this,
                checkedArr = [],
                _string = '',
                {showNumber, getCheckedValue, data, chooseText} = _this.config;

            this.element.find('input[name="mulItem"]').each(function () {
                const $this = $(this);
                if ($this.is(':checked')) {
                    checkedArr.push($this.val());
                }
            });

            getCheckedValue(checkedArr, _this.element);

            if (showNumber <= checkedArr.length) {
                _string = `${checkedArr.length} selected`;
            } else {
                _string = checkedArr.join(' , ');
            }

            if (checkedArr.length === data.length && showNumber < checkedArr.length) {
                _string = `All selected(${checkedArr.length})`;
            }

            if (checkedArr.length === 0) {
                _string = chooseText;
            }

            _this.element.find('.mulselect-text').text(_string).attr('title', _string);

        },
        /**
         *  新增项
         * */
        addItem: function () {
            const _this = this,
                $selector = _this.element,
                {canNotSameName} = _this.config;

            //新增列
            $selector.on('click', '.btn-add', function (e) {
                e.stopPropagation();
                const _val = $(this).prev().val();

                if (_val.length > 0) {
                    let checkedArr = [];
                    $selector.find('input[name="mulItem"]').each(function () {
                        checkedArr.push($(this).val());
                    });
                    if (checkedArr.indexOf(_val) !== -1) {
                        $selector.find('.vilExpression').text(canNotSameName).show();
                        return;
                    }
                    $selector.find('.vilExpression').hide();

                    _this.config.data.push({
                        name: `.${_val}`,
                        disable: ''
                    });
                    _this.config.isOpen = true;

                    $selector.find('.mulselect-list').append(`
                            <li class="mulselect-item checked-item checked" title="${_val}">
                                <input type="checkbox" value="${_val}" name="mulItem" data-type="item" checked=true>${_val}
                            </li>
                        `);
                    $selector.find('.add-col').val('');
                    _this.getCheckedValue();
                    // _this.create();
                }
            });

            //enter新增
            $selector.on('keyup', '.add-col', function (e) {
                const _value = $(this).val();

                if (_value.length > 0) {
                    let checkedArr = [];
                    $selector.find('input[name="mulItem"]').each(function () {
                        checkedArr.push($(this).val());
                    });
                    if (checkedArr.indexOf(_value) !== -1) {
                        $selector.find('.vilExpression').show().text(canNotSameName);
                        return;
                    }

                    $selector.find('.vilExpression').hide();

                    if (e.keyCode === 13) {
                        _this.config.data.push({
                            name: _value,
                            disable: ''
                        });
                        _this.config.isOpen = true;

                        $selector.find('.mulselect-list').append(`
                                <li class="mulselect-item checked-item checked" title="${_value}">
                                    <input type="checkbox" value="${_value}" name="mulItem" data-type="item" checked=true>${_value}
                                </li>
                            `);
                        _this.getCheckedValue();
                        $selector.find('.add-col').val('');
                    }

                    // _this.create();
                }
            });
        }
    };

    //封装到window对象上
    window.MulSelect = MulSelect;
    //封装到jquery对象上
    $.fn.MulSelect = function (config) {
        const mulSelect = new MulSelect(this, config);
        return mulSelect.init();
    }

})(jQuery);

