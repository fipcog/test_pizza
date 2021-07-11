"use strict";

$(function () {
    let order = {};
    const selectedOptionSelector = " option:selected";

    /**
     * Activate second select and remove option-placeholder
     *
     * @param {String} firstClass
     * @param {String} secondClass
     *
     * @return {void}
     */
    const activation = function (firstClass , secondClass) {
        $("."+firstClass+" option[value='0']").remove();
        $("."+secondClass).removeAttr("disabled");
    };

    $(".order").on("change",function () {
        if ($(".pizza_name" +selectedOptionSelector).attr("value") !== "0") {
            order.name = data.names[$(".pizza_name" +selectedOptionSelector).attr("value")];
            activation("pizza_name", "pizza_size");
        }

        if ($(".pizza_size" +selectedOptionSelector).attr("value") !== "0") {
            let size = $(".pizza_size" +selectedOptionSelector).attr("value");

            order.size = data.sizes[size];
            order.price = data.prices[size];
            activation("pizza_size", "pizza_sauce");
        }

        if ($(".pizza_sauce" +selectedOptionSelector).attr("value") !== "0") {
            order.sauce =  data.sauces[$(".pizza_sauce" +selectedOptionSelector).attr("value")];
            activation("pizza_sauce", "order__btn");
        }
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

         return check
    };

    $(".order__btn").on("click", function (event) {
        event.preventDefault();
        $(".order__btn").attr("disabled", true);
        $(".order .check").remove();
        $(".order").append(createCheck(order));
    });
});