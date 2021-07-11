"use strict";

$(function () {
    let order = {};
    let names = Object.values(data.names);
    let sizes = Object.values(data.sizes);
    let sauces = Object.values(data.sauces);
    const checkBtn = $(".order__btn_ui");

    /**
     * remove disabled from input and an arrow button
     *
     * @param {String} classOfInput
     *
     * @return {void}
     */
    const removeDisabled = function (classOfInput) {
        $("." + classOfInput).removeAttr("disabled");
        $("." + classOfInput +  "+ .drop_out").removeAttr("disabled");
    };

    /**
     * if order filled function make the button enabled
     *
     * @param {Object} order
     *
     * @return {void}
     */
    const checkIfOrderFilled = function (order) {
        if (order.name && order.size && order.price && order.sauce) {
            checkBtn.button("option", "disabled", false);
        }
    };

    $(".pizza_name_ui").autocomplete({
        source: names,
        minLength: 0,
        select: function (event, ui) {
            order.name = ui.item.label;
            checkIfOrderFilled(order);
            removeDisabled("pizza_size_ui");
        }
    });

    $(".pizza_size_ui").autocomplete({
        source: sizes,
        minLength: 0,
        select: function (event, ui) {
            order.size = ui.item.label;
            order.price = data.prices[ui.item.label[0]+ui.item.label[1]];
            checkIfOrderFilled(order);
            removeDisabled("pizza_sauce_ui");
        }
    });

    $(".pizza_sauce_ui").autocomplete({
        source: sauces,
        minLength: 0,
        select: function (event, ui) {
            order.sauce = ui.item.label;
            checkBtn.button("option", "disabled", false);
        }
    });

    $("input").on("click", function (event) {
        let targetClassList = event.target.classList;

        if(targetClassList.contains("pizza_name_ui")) $(".pizza_name_ui").autocomplete("search");
        if(targetClassList.contains("pizza_size_ui")) $(".pizza_size_ui").autocomplete("search");
        if(targetClassList.contains("pizza_sauce_ui")) $(".pizza_sauce_ui").autocomplete("search");
    });

    $(".drop_out").on("click", function (event) {
        event.preventDefault();
        let prevSibling = event.target.previousElementSibling;

        if(prevSibling.classList.contains("pizza_name_ui")) $(".pizza_name_ui").autocomplete("search");
        if(prevSibling.classList.contains("pizza_size_ui")) $(".pizza_size_ui").autocomplete("search");
        if(prevSibling.classList.contains("pizza_sauce_ui")) $(".pizza_sauce_ui").autocomplete("search");
    });

    /**
     * take the data from object and create a check element
     *
     * @param {Object} order
     *
     * @return {jQuery}
     */
    const createCheck = function (order) {
        let check = $("<div>", { class : "check"}).html(
            "<h3>Чек</h3>" +
            "<p>Вы заказали пиццу: "+order.name+"</p>" +
            "<p>Размер: "+order.size+"</p>" +
            "<p>С соусом: "+order.sauce+"</p>" +
            "<p>Цена - "+order.price+"</p> "
        );

        return check;
    };

    checkBtn.button({
        create: function (event) {
            $(event.target).on("click", function (e) {
                e.preventDefault();
                $(".order_UI .check").remove();
                $(".order_UI").append(createCheck(order));
                checkBtn.button("option", "disabled", true);
            })
        }
    });
    checkBtn.button("option", "disabled", true);
    checkBtn.button("option", "label", "Заказать");
})