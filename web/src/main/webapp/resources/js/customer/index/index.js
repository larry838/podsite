var podsite = {
    index : {
        initHomePage : function() {
            $(".page-content").load(sys.rootPath + "/welcome.jsp");
            $(".breadcrumb").html('<li><i class="ace-icon fa fa-home home-icon"></i><a href="javascript:podsite.index.initHomePage();">首页</a></li><li class="active">控制台</li>');
        },
        menu : {
            initMenuEvent : function() {
                $("[nav-menu]").each(function() {
                	
                    $(this).bind("click", function() {
                    	var lay;
                        var nav = $(this).attr("nav-menu");
                        var sn = nav.split(",");
                        //清除用户信息菜单样式
                        $(".user-menu").find('li').each(function() {
                            $(this).removeClass('active');
                        });
                        //处理监控-新窗口打开
                        if (sn[sn.length - 1] == '/sirona' || sn[sn.length - 1] == '/druid') {
                            window.open(sys.rootPath + sn[sn.length - 1]);
                        } else {
                            var breadcrumb = '<li><i class="ace-icon fa fa-home home-icon"></i><a href="javascript:podsite.index.initHomePage();">首页</a></li>';
                            for (var i = 0; i < sn.length - 1; i++) {
                                breadcrumb += '<li class="active">' + sn[i] + '</li>';
                            }
                            lay = layer.load();
                            //设置面包屑内容
                            $(".breadcrumb").html(breadcrumb);
                            //加载页面
                            $(".page-content").empty();//清除该节点子元素
                            $(".page-content").load(sys.rootPath + sn[sn.length - 1],function(){
                            	layer.close(lay);
                            });
                        }
                        var level = $(this).parent("li").attr("level");
                        if (level == 'level1' || level == 'level2') {
                            //处理目录类型的点击事件-两级菜单
                            $(this).parent("li").siblings().find("ul.nav-show").removeClass('nav-show').addClass('nav-hide').attr('style', 'display:none');
                            //处理菜单类型的点击事件
                            $(this).parent().parent().parent("li").siblings().find("ul.nav-show").removeClass('nav-show').addClass('nav-hide').attr('style', 'display:none');
                            $("ul.nav-list").find("li.active").removeClass("active").removeClass('open');
                            $(this).parent().addClass("active").parent().parent("li").addClass('active open');
                        } else if (level == 'level3') {
                            //处理目录类型的点击事件-三级菜单
                            $(this).parent("li").siblings().find("ul.nav-show").removeClass('nav-show').addClass('nav-hide').attr('style', 'display:none');
                            //处理菜单类型的点击事件
                            $(this).parent().parent().parent().parent().parent("li").siblings().find("ul.nav-show").removeClass('nav-show').addClass('nav-hide').attr('style', 'display:none');
                            $("ul.nav-list").find("li.active").removeClass("active").removeClass('open');
                            $(this).parent().addClass("active").parent().parent().parent().parent("li").addClass('active open');
                        } else {
                            //处理目录类型的点击事件-四级菜单
                            $(this).parent("li").siblings().find("ul.nav-show").removeClass('nav-show').addClass('nav-hide').attr('style', 'display:none');
                            //处理菜单类型的点击事件
                            $(this).parent().parent().parent().parent().parent().parent().parent("li").siblings().find("ul.nav-show").removeClass('nav-show').addClass('nav-hide').attr('style', 'display:none');
                            $("ul.nav-list").find("li.active").removeClass("active").removeClass('open');
                            $(this).parent().addClass("active").parent().parent().parent().parent().parent().parent("li").addClass('active open');
                        }
                        
                    });
                });
            },
            initDropdownMenuStyle : function() {
                $(".user-menu").find('li').each(function() {
                    $(this).bind('click', function() {
                        $(this).siblings().removeClass('active');
                        $(this).addClass('active');
                    });
                });
            }
        },
        initNavigation : function() {
            $("#ace-settings-navbar").click();
            $("#ace-settings-sidebar").click();
        },
        initScrollBar : function() {
            $("html").niceScroll({
                cursorborderradius : "5px",
                cursorwidth : 10
            });
        },
        /*
         * 监听浏览器窗口大小变化
         */
        resizeScrollBar : function() {
            $(window).resize(function() {
                $("html").getNiceScroll().resize();
            });
        }
    },
    common : {
        /**
         *加载非菜单展示页面
         * @param nav 待加载的资源URL
         */
        loadPage : function(nav) {
            //加载页面
            $(".page-content").load(sys.rootPath + nav);
        },
        /**
         * 新增
         * @param {Object} nav  提交url
         */
        addModel : function(nav) {
            //加载新增页面
            podsite.common.loadPage(nav);
        },
        /**
         * 编辑
         * @param {Object} nav  提交url
         */
        editModel : function(nav) {
            //当前页码
            var nowPage = grid.pager.nowPage;
            //获取每页显示的记录数(即: select框中的10,20,30)
            var pageSize = grid.pager.pageSize;
            //获取排序字段
            var columnId = grid.sortParameter.columnId;
            //获取排序方式 [0-不排序，1-正序，2-倒序]
            var sortType = grid.sortParameter.sortType;
            //获取选择的行
            var rows = grid.getCheckedRecords();
            if (rows.length == 1) {
            	if (nav == '/user/editUI.html') {
                    if (rows[0].role.key == 'administrator') {
                        layer.msg('该用户为超级管理员,不能编辑!', {
                            icon : 0
                        });
                        return false;
                    }
                }
                if (nav == '/role/editUI.html') {
                    if (rows[0].key == 'administrator') {
                        layer.msg('该角色为基础角色,不能编辑!', {
                            icon : 0
                        });
                        return false;
                    }
                }
                podsite.common.loadPage(nav + '?id=' + rows[0].id + "&page=" + nowPage + "&rows=" + pageSize + "&sidx=" + columnId + "&sord=" + sortType);
            } else {
                layer.msg("你没有选择行或选择了多行数据", {
                    icon : 0
                });
            }
        },
        /**
         * 删除
         * @param {Object} nav  提交url
         * @param callback 主函数执行完毕后调用的回调函数名称
         */
        delModel : function(nav, callback) {
            var rows = grid.getCheckedRecords();
            if (rows.length == 1) {
                if (nav == '/user/deleteBatch.html') {
                    if (rows[0].role.key == 'administrator') {
                        layer.msg('该用户为超级管理员,不能删除!', {
                            icon : 0
                        });
                        return false;
                    }
                }
                if (nav == '/role/deleteBatch.html') {
                    if (rows[0].key == 'administrator') {
                        layer.msg('该角色为基础角色,不能删除!', {
                            icon : 0
                        });
                        return false;
                    }
                }
                layer.confirm('确认删除吗？', {
                    icon : 3,
                    title : '删除提示'
                }, function(index, layero) {
                    var delete_ids = [];
                    /*
                     $.each(rows, function(index, value) {
                     ids.push(this.id);
                     });
                     */
                    delete_ids.push(rows[0].id);
                    $.ajax({
                        type : "POST",
                        url : sys.rootPath + nav,
                        data : {
                            "ids" : delete_ids.join(',')
                        },
                        dataType : "json",
                        success : function(resultdata) {
                            if (resultdata.success) {
                                layer.msg(resultdata.message, {
                                    icon : 1
                                });
                                if (callback) {
                                    callback();
                                }
                            } else {
                                layer.msg(resultdata.message, {
                                    icon : 5
                                });
                            }
                        },
                        error : function(errorMsg) {
                            layer.msg('服务器未响应,请稍后再试', {
                                icon : 3
                            });
                        }
                    });
                    layer.close(index);
                });
            } else {
                layer.msg("你没有选择行或选择了多行数据", {
                    icon : 0
                });
            }
        },
        /**
         * 提交表单
         * 适用场景：form表单的提交，主要用在用户、角色、资源等表单的添加、修改等
         * @param {Object} commitUrl 表单提交地址
         * @param {Object} listUrl 表单提交成功后转向的列表页地址
         */
        commit : function(formId, commitUrl, jumpUrl) {
            //组装表单数据
            var index;
            var data = $("#" + formId).serialize();
            if (undefined != $("#pageNum").val()) {
                jumpUrl = jumpUrl + '?page=' + $("#pageNum").val() + '&rows=' + $("#pageSize").val() + '&sidx=' + $("#orderByColumn").val() + '&sord=' + $("#orderByType").val();
            }
            $.ajax({
                type : "POST",
                url : sys.rootPath + commitUrl,
                data : data,
                dataType : "json",
                beforeSend : function() {
                    index = layer.load();
                },
                success : function(resultdata) {
                    layer.close(index);
                    if (resultdata.success) {
                        layer.msg(resultdata.message, {
                            icon : 1
                        });
                        podsite.common.loadPage(jumpUrl);
                    } else {
                        layer.msg(resultdata.message, {
                            icon : 5
                        });
                    }
                },
                error : function(data, errorMsg) {
                    layer.close(index);
                    layer.msg(data.responseText, {
                        icon : 2
                    });
                }
            });
        },
        /**
         * 修改密码提交表单
         * 适用场景：form表单的提交，主要用在修改密码
         * @param {Object} commitUrl 表单提交地址
         * @param {Object} listUrl 表单提交成功后转向的列表页地址
         */
        commitPassword : function(formId, commitUrl, jumpUrl) {
            //组装表单数据
            var index;
            var data = $("#" + formId).serialize();
            $.ajax({
                type : "POST",
                url : sys.rootPath + commitUrl,
                data : data,
                dataType : "json",
                beforeSend : function() {
                    index = layer.load();
                },
                success : function(resultdata) {
                    layer.close(index);
                    if (resultdata.success) {
                        layer.msg(resultdata.message, {
                            icon : 1
                        });
                        window.location.href=sys.rootPath + jumpUrl;
                    } else {
                        layer.msg(resultdata.message, {
                            icon : 5
                        });
                    }
                },
                error : function(data, errorMsg) {
                    layer.close(index);
                    layer.msg(data.responseText, {
                        icon : 2
                    });
                }
            });
        }
    },
    form : {
        user : {},
        userInfo : {},
        role : {},
        resource : {
            initSourceType : function() {
                $('#type').select2({
                    language : "zh-CN",
                    minimumResultsForSearch : Infinity
                });
            },
            initSourceTree : function() {
                $('#parentId').select2({
                    placeholder : "请选择上级资源...",
                    language : "zh-CN",
                    minimumResultsForSearch : Infinity,
                    templateResult : podsite.form.resource.formatState,
                    templateSelection : function(selection) {
                        return $.trim(selection.text);
                    }
                });
            },
            formatState : function(state) {
                if (!state.id) {
                    return state.text;
                }
                var $state = $('<span><i class="fa fa-file-text-o green"></i>&nbsp;&nbsp;' + state.text + '</span>');
                return $state;
            },
            initIcon : function() {
                $("#icon").bind('focus', function(event) {
                    var iconLayer = layer.open({
                        type : 2,
                        scrollbar : false,
                        content : sys.rootPath + '/resource/icon.html',
                        area : 'auto',
                        maxmin : true,
                        shift : 4,
                        title : '<i class="fa fa-cogs"></i>&nbsp;选择图标'
                    });
                    //弹出即全屏
                    layer.full(iconLayer);
                });
                $("#iconShow").bind('click', function(event) {
                    $("#icon").val('');
                    $(this).removeClass();
                });
                $('[data-rel=tooltip]').tooltip();
            },
            initType : function() {
                $("#parentId").change(function() {
                    var parentId = $.trim($(this).children('option:selected').val());
                    if (parentId == null || parentId == '') {
                        //$("#iconDiv").show();
                        //$("#sourceUrlDiv").hide();
                    } else {
                        //$("#iconDiv").hide();
                        //$("#sourceUrlDiv").show();
                    }
                });
            },
            validateResourceForm : function() {
                $('#resourceForm').validate({
                    errorElement : 'div',
                    errorClass : 'help-block',
                    focusInvalid : false,
                    ignore : "",
                    rules : {
                        parentId : {
                            required : true
                        },
                        name : {
                            required : true
                        },
                        sourceKey : {
                            required : true
                        },
                        type : {
                            required : true
                        },
                        sourceUrl : {
                            required : function() {
                                /*
                                 //仅目录菜单不需要url
                                 var parentId = $.trim($("#parentId").val());
                                 if (parentId == null || parentId == "") {
                                 return false;
                                 } else {
                                 return true;
                                 }
                                 */
                                return false;
                            }
                        },
                        icon : {
                            required : function() {
                                /*
                                 //仅目录菜单需要icon
                                 var parentId = $.trim($("#parentId").val());
                                 if (parentId == null || parentId == "") {
                                 return true;
                                 } else {
                                 return false;
                                 }
                                 */
                                return false;
                            }
                        }
                    },
                    messages : {
                        parentId : "请选择上级资源",
                        name : "请填写资源名称",
                        sourceKey : "请填写资源标识",
                        type : "请选择资源类型",
                        sourceUrl : "请填写资源URL",
                        icon : "请选择菜单图标"
                    },
                    highlight : function(e) {
                        $(e).closest('.form-group').removeClass('has-info').addClass('has-error');
                    },
                    success : function(e) {
                        $(e).closest('.form-group').removeClass('has-error').addClass('has-success');
                        $(e).remove();
                    },
                    errorPlacement : function(error, element) {
                        if (element.is('input[type=checkbox]') || element.is('input[type=radio]')) {
                            var controls = element.closest('div[class*="col-"]');
                            if (controls.find(':checkbox,:radio').length > 1)
                                controls.append(error);
                            else
                                error.insertAfter(element.nextAll('.lbl:eq(0)').eq(0));
                        } else if (element.is('.select2')) {
                            error.insertAfter(element.siblings('[class*="select2-container"]:eq(0)'));
                        } else if (element.is('.chosen-select')) {
                            error.insertAfter(element.siblings('[class*="chosen-container"]:eq(0)'));
                        } else
                            error.insertAfter(element.parent());
                    },
                    submitHandler : function(form) {
                        var resourceId = $("#resourceId").val();
                        var url = "";
                        if (resourceId != undefined) {
                            url = '/resource/edit.html';
                        } else {
                            url = '/resource/add.html';
                        }
                        podsite.common.commit('resourceForm', url, '/resource/listUI.html');
                    }
                });
            },
            authorize : {
                ids : [],
                initResourceTree : function() {
                    $('#tree').jstree({
                        "core" : {
                            'data' : {
                                "url" : sys.rootPath + "/resource/resourceTree.html?roleId=" + $("#id").val(),
                                "dataType" : "json"
                            },
                            "themes" : {
                                "responsive" : true
                            },
                            "multiple" : true,
                            "animation" : 200,
                            "dblclick_toggle" : true,
                            "expand_selected_onload" : true
                        },
                        "checkbox" : {
                            "keep_selected_style" : true,
                            "three_state" : false,
                            "cascade" : "up"
                        },
                        "plugins" : ["checkbox"]
                    });
                },
                /**
                 * 递归遍历节点，获取该节点的所有父节点
                 * @param {Object} treeObj  jstree对象
                 * @param {Object} nodeObj  jstree node节点对象
                 */
                getParents : function(treeObj, nodeObj) {
                    var parentId = treeObj.get_parent(nodeObj);
                    if (parentId != "#") {
                        podsite.form.resource.authorize.ids.push(parentId);
                        podsite.form.resource.authorize.getParents(treeObj, treeObj.get_node(parentId));
                    }
                },
                /**
                 * 提交表单
                 * 适用场景：form表单的提交，角色授权提交
                 * @param {Object} commitUrl 表单提交地址
                 * @param {Object} listUrl 表单提交成功后转向的列表页地址
                 */
                commitPerm : function(commitUrl, listUrl) {
                    podsite.form.resource.authorize.ids = [];
                    var tree = $('#tree').jstree();
                    //获取所有选中节点id
                    var selectedIds = tree.get_checked();
                    //获取所有选中节点
                    var selected = tree.get_checked(true);
                    //遍历节点，获取选中节点的所有父节点
                    for (var i = 0; i < selected.length; i++) {
                        podsite.form.resource.authorize.getParents(tree, selected[i]);
                    }
                    var index;
                    $.ajax({
                        type : "POST",
                        url : sys.rootPath + commitUrl,
                        data : {
                            "roleId" : $("#id").val(),
                            "resourceIds" : _.union(podsite.form.resource.authorize.ids, selectedIds).join(',')
                        },
                        dataType : "json",
                        beforeSend : function() {
                            index = layer.load();
                        },
                        success : function(resultdata) {
                            layer.close(index);
                            if (resultdata.success) {
                                layer.msg(resultdata.message, {
                                    icon : 1
                                });
                                podsite.common.loadPage(listUrl + '?page=' + $("#pageNum").val() + '&rows=' + $("#pageSize").val() + '&sidx=' + $("#orderByColumn").val() + '&sord=' + $("#orderByType").val());
                            } else {
                                layer.msg(resultdata.message, {
                                    icon : 5
                                });
                            }
                        },
                        error : function(errorMsg) {
                            layer.close(index);
                            layer.msg('服务器未响应,请稍后再试', {
                                icon : 2
                            });
                        }
                    });
                }
            }
        },
        schedule: {}
    }
};