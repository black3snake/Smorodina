$(document).ready(function () {

    $(window).keyup(function (e) {
        let target = $('.radio-btn input:focus');
        if (e.keyCode === 9 && $(target).length) {
            $(target).parent().addClass('focused');
        }
    });
    $(window).keyup(function (e) {
        let target = $('.checkbox-btn input:focus');
        if (e.keyCode === 9 && $(target).length) {
            $(target).parent().addClass('focused');
        }
    });
    $('.radio-btn input').focusout(function () {
        $(this).parent().removeClass('focused');
    });
    $('.checkbox-btn input').focusout(function () {
        $(this).parent().removeClass('focused');
    });

    // Основные переменные для построения и заполнения объекта
    const arrowRight = $('.poligonRight')
    const arrowLeft = $('.poligonLeft')
    const razmerUch = $('#razmerUch');
    const udalFromIrkutsk = $('#udalFromIrkutsk');
    const formU__page = $('fieldset');
    const mainLeftTitle = $('.main__left-title');
    const mainLeftPage = $('.main__left-page');
    const topologPole = $('input[type=radio][name=availability]');
    const fastWorkPole = $('input[type=radio][name=lead_time]')
    const sale_markup = $('.main__right-sale_markup');
    const sale_markupValue = $('#markup50');
    const dataOne = {
        razmer_Uch: 0,
        udal_Form_Irkutsk: 0,
        toposemkA: '',
        time_Work: '',
        types_of_Work1: [],
        types_of_Work2: [],
        itog_price_without_sale: ''
    }
    const objSale = {
        markup50:  function (time_Work) {
            return time_Work === '10';
        },
        sale3: false,
        sale5: false
    }

    function kdFunc(e) {
        if (!e.ctrlKey && !e.metaKey && !/[0-9,]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete' && e.key !== 'ArrowLeft' && e.key !== 'ArrowRight' && e.key !== 'Tab') {
            return false;
        }
    }
    // Запрет на ввод букв
    razmerUch.on('keydown', kdFunc);
    udalFromIrkutsk.on('keydown', kdFunc);


    function fillObject() {
        topologPole.each((index, elem) => {
            if (elem.checked) {
                dataOne.toposemkA = elem.value;
            }
        });
        fastWorkPole.each((index, elem) => {
            if (elem.checked) {
                dataOne.time_Work = elem.value;
            }
        });
        dataOne.types_of_Work1 = $(`input[type=checkbox][name="types_of_work1[]"]:checked`).map((_, checkbox) => checkbox.value).get();
        dataOne.types_of_Work2 = $(`input[type=checkbox][name="types_of_work2[]"]:checked`).map((_, checkbox) => checkbox.value).get();
        dataOne.razmer_Uch = razmerUch.val();
        dataOne.udal_Form_Irkutsk = udalFromIrkutsk.val();
        console.log(dataOne);
    }

    function rightFill(flagB, objSale) {
        if (flagB) {
            mainLeftTitle.addClass('d-none');
            $('div.main__left').removeClass('col-xl-8 col-md-8').addClass('col-xl-2 col-md-2');
            $('div.main__right').removeClass('col-xl-4 col-md-4').addClass('col-xl-10 col-md-10');
            $('.main__right-text').removeClass('d-none');
            $('form.formU2Left').removeClass('d-none');
            $('div.offer').removeClass('d-none');
            $('.main__itog').removeClass('mb-4');
            console.log(objSale);

            if(objSale.markup50(dataOne.time_Work) || objSale.sale3 || objSale.sale5) {
                $('.main__itog-price').removeClass('mb-4');
                sale_markup.removeClass('d-none')
                if(objSale.markup50(dataOne.time_Work)) {
                    $('.markup').removeClass('d-none')
                }
                if(objSale.sale3 || objSale.sale5) {
                    $('.sale').removeClass('d-none')
                }
            } else {
                $('.main__itog-price').addClass('mb-4');
            }

        } else {
            mainLeftTitle.removeClass('d-none');
            $('div.main__left').removeClass('col-xl-2 col-md-2').addClass('col-xl-8 col-md-8');
            $('div.main__right').removeClass('col-xl-10 col-md-10').addClass('col-xl-4 col-md-4');
            $('.main__right-text').addClass('d-none');
            $('form.formU2Left').addClass('d-none');
            $('div.offer').addClass('d-none');
            $('.main__itog').addClass('mb-4');
            if(!sale_markup.hasClass('d-none')){
                sale_markup.addClass('d-none')
            }
        }
    }

    //Логика
    // Объект с ценами на услуги
    const price = {
        toposemkA: 15000,
        GenPlan: 10000,
        D3visualProject: 20000,
        SituationPlan: 10000,
        Dendrological: 15000,
        LightingSchemeProject: 17000,
        DrainageSchemeProject: 20000,
        AutomaticWateringSchemeProject: 8000,
        visiting_the_site_60: 1000,
        visiting_the_site_61_90: 3000
    };

    function logicR(obj) {
        let pricePage = 0.0;
        return pricePage;
    }

    // работа с итоговой ценой на правой стороне
    let itog_price = $('.main__itog-price');
    function outPriceRub(price) {
        return itog_price.text(`${price},00 руб`)
    }
    function inPriceRub(price) {
        return parseInt(price.slice(0, price.indexOf(',')));
    }

    // page1
    let b60 = false;
    let b90 = false;
    let udKm = 0;

    udalFromIrkutsk.on('blur change', function () {
        let ptemp = 0;
        if ($(this).val() && !b60 && !b90) {
            console.log($(this).val());
            if (parseInt($(this).val()) <= 61) {
                ptemp = inPriceRub(itog_price.text());
                outPriceRub((ptemp + price.visiting_the_site_60))
                b60 = true;
                // console.log(`${ptemp} : b60 - ${b60} : b90 - ${b90} `);
            // } else if (parseInt($(this).val()) > 61 && parseInt($(this).val()) <= 90) {
            } else if (parseInt($(this).val()) > 61) {
                ptemp = inPriceRub(itog_price.text());
                outPriceRub((ptemp + price.visiting_the_site_61_90))
                b90 = true;
                // console.log(`${ptemp} : b60 - ${b60} : b90 - ${b90} `);
            }
        } else if (b60 && udKm !== $(this).val()) {
            ptemp = inPriceRub(itog_price.text());
            outPriceRub((ptemp - price.visiting_the_site_60))
            b60 = false;
            // console.log(`${ptemp} : b60 - ${b60} : b90 - ${b90} `);
        } else if (b90 && udKm !== $(this).val()) {
            ptemp = inPriceRub(itog_price.text());
            outPriceRub((ptemp - price.visiting_the_site_61_90))
            b90 = false;
            // console.log(`${ptemp} : b60 - ${b60} : b90 - ${b90} `);
        }
        udKm = $(this).val();
    });

    // топосъемка
    topologPole.each((_, radio) => {
        radio.addEventListener('click', function () {
            let ptemp = 0;
            if (radio.checked && radio.value === 'yes') {
                ptemp = inPriceRub(itog_price.text());
                outPriceRub((ptemp + price.toposemkA))
            } else {
                ptemp = inPriceRub(itog_price.text());
                outPriceRub((ptemp - price.toposemkA))
            }
        });
    })

    function fastWorkFunc(price) {
        let flag = '';
        fastWorkPole.each((index, elem) => {
            if (elem.checked) {
                flag = elem.value;
            }
        });
        if (flag === '10') {
            return price * 1.5;
        }
        return price;
    }

    // Время выполнения работ
    fastWorkPole.each((_, radio) => {
        radio.addEventListener('click', function () {
            if (radio.checked && radio.value === '10') {

                console.log('100.0')
            } else {
                console.log('0.0')
            }
        });
    })

    // page2
    $('input[type=checkbox][name="types_of_work1[]"]').each((_, checkbox) => {
        // console.log(checkbox.checked);
       let ptemp = 0;
        checkbox.addEventListener('click', function () {
            // GenPlan
            if (checkbox.checked && checkbox.value === 'GenPlan') {
                ptemp = inPriceRub(itog_price.text());
                outPriceRub((ptemp + price.GenPlan))
            } else if (!checkbox.checked && checkbox.value === 'GenPlan') {
                ptemp = inPriceRub(itog_price.text());
                outPriceRub((ptemp - price.GenPlan))
            }
            // 3DvisualProject
            if (checkbox.checked && checkbox.value === '3DvisualProject') {
                ptemp = inPriceRub(itog_price.text());
                outPriceRub((ptemp + price.D3visualProject))
            } else if (!checkbox.checked && checkbox.value === '3DvisualProject') {
                ptemp = inPriceRub(itog_price.text());
                outPriceRub((ptemp - price.D3visualProject))
            }
            // SituationPlan
            if (checkbox.checked && checkbox.value === 'SituationPlan') {
                ptemp = inPriceRub(itog_price.text());
                outPriceRub((ptemp + price.SituationPlan))
            } else if (!checkbox.checked && checkbox.value === 'SituationPlan') {
                ptemp = inPriceRub(itog_price.text());
                outPriceRub((ptemp - price.SituationPlan))
            }
            // Dendrological
            if (checkbox.checked && checkbox.value === 'Dendrological') {
                ptemp = inPriceRub(itog_price.text());
                outPriceRub((ptemp + price.Dendrological))
            } else if (!checkbox.checked && checkbox.value === 'Dendrological') {
                ptemp = inPriceRub(itog_price.text());
                outPriceRub((ptemp - price.Dendrological))
            }
        })
    });

    // page 3
    $('input[type=checkbox][name="types_of_work2[]"]').each((_, checkbox) => {
        console.log(checkbox.checked);
        let ptemp = 0;
        checkbox.addEventListener('click', function () {
            // LightingSchemeProject
            if (checkbox.checked && checkbox.value === 'LightingSchemeProject') {
                ptemp = inPriceRub(itog_price.text());
                outPriceRub((ptemp + price.LightingSchemeProject))
            } else if (!checkbox.checked && checkbox.value === 'LightingSchemeProject') {
                ptemp = inPriceRub(itog_price.text());
                outPriceRub((ptemp - price.LightingSchemeProject))
            }
            // DrainageSchemeProject
            if (checkbox.checked && checkbox.value === 'DrainageSchemeProject') {
                ptemp = inPriceRub(itog_price.text());
                outPriceRub((ptemp + price.DrainageSchemeProject))
            } else if (!checkbox.checked && checkbox.value === 'DrainageSchemeProject') {
                ptemp = inPriceRub(itog_price.text());
                outPriceRub((ptemp - price.DrainageSchemeProject))
            }
            // AutomaticWateringSchemeProject
            if (checkbox.checked && checkbox.value === 'AutomaticWateringSchemeProject') {
                ptemp = inPriceRub(itog_price.text());
                outPriceRub((ptemp + price.AutomaticWateringSchemeProject))
            } else if (!checkbox.checked && checkbox.value === 'AutomaticWateringSchemeProject') {
                ptemp = inPriceRub(itog_price.text());
                outPriceRub((ptemp - price.AutomaticWateringSchemeProject))
            }



        })
    });



    let flagSale = false;
    // Обработка стрелок
    arrowRight.on('click', function (e) {
        let hasError = false;
        $('.error-input').hide();

        if (!razmerUch.val()) {
            razmerUch.css('margin-bottom', 0)
            razmerUch.next().show();
            hasError = true;
        } else {
            razmerUch.css('margin-bottom', '25px')
        }
        if (!udalFromIrkutsk.val()) {
            udalFromIrkutsk.css('margin-bottom', 0)
            udalFromIrkutsk.next().show();
            hasError = true;
        } else {
            udalFromIrkutsk.css('margin-bottom', '25px')
        }

        if (!hasError) {
            formU__page.each((ind, elem) => {
                if (elem.classList.contains('formU__page4')) {
                    return false;
                }
                if (elem.classList.contains('formU__page3') && !elem.classList.contains('d-none')) {
                    formU__page.eq(ind).addClass('d-none');
                    formU__page.eq(ind + 1).removeClass('d-none');
                    mainLeftPage.text(`${ind + 2}/4`);
                    arrowRight.css('fill', '#B4B4B4')

                    fillObject();
                    rightFill(true, objSale)

                    let ptemp = 0;
                    if(!flagSale) {
                        dataOne.itog_price_without_sale = itog_price.text();
                    }
                    if(dataOne.time_Work === '10') {
                        ptemp = inPriceRub(itog_price.text());
                        outPriceRub(fastWorkFunc(ptemp));
                        sale_markupValue.text(`${fastWorkFunc(ptemp) - ptemp} руб`);
                        flagSale = true;
                    }

                    console.log('прилетели в правый конец');
                    return false;
                }
                if (!elem.classList.contains('d-none')) {
                    formU__page.eq(ind).addClass('d-none');
                    if (ind >= 0) {
                        mainLeftTitle.css('text-align', 'center');
                        arrowLeft.css('fill', '#4A4A4A')
                        formU__page.eq(ind + 1).removeClass('d-none');
                        mainLeftPage.text(`${ind + 2}/4`);
                    }
                    return false;
                }
            });
        }
        // fillObject();
        console.log('Жмякаем вправо');
    })

    arrowLeft.on('click', function (e) {
        formU__page.each((ind, elem) => {
            if (arrowRight.css('fill') === 'rgb(180, 180, 180)') {
                arrowRight.css('fill', '#4A4A4A')
                rightFill(false);
                if(flagSale) {
                    itog_price.text(dataOne.itog_price_without_sale)
                    flagSale = false;
                }

            }
            if (ind === 0 && !elem.classList.contains('d-none')) {
                console.log('улетаем');
                return false;
            }
            if (!elem.classList.contains('d-none')) {
                formU__page.eq(ind).addClass('d-none');
                if (ind > 0) {
                    formU__page.eq(ind - 1).removeClass('d-none');
                    mainLeftPage.text(ind + "/4");

                    if (ind - 1 === 0) {
                        arrowLeft.css('fill', '#B4B4B4')
                    }
                }
                // console.log(elem, ind)
                return false;
            }
        })
    })


    let name = $('#firstName');
    let phone = $('#phone');
    let email = $('#email');
    phone.inputmask({"mask": "(999) 999-9999"});
    // Финальная обработка формы
    // const forms = document.querySelectorAll('.needs-validation')
    // Array.from(forms).forEach(form => {
    //     form.addEventListener('submit', event => {
    //         if (!form.checkValidity()) {
    //             event.preventDefault()
    //             event.stopPropagation()
    //         }
    //         form.classList.add('was-validated')

    $('#submit').on('click', function (event) {
        let hasError = false;

        $('.invalid-feedback').hide();

        if (!name.val()) {
            name.removeClass('mb-4');
            name.next().show();
            hasError = true;
        } else {
            if (!name.hasClass('mb-4')) {
                name.addClass('mb-4');
            }
        }
        if (!phone.val()) {
            phone.removeClass('mb-4');
            phone.next().show();
            hasError = true;
        } else {
            if (!phone.hasClass('mb-4')) {
                phone.addClass('mb-4');
            }
        }
        if (!email.val()) {
            email.removeClass('mb-4');
            email.next().show();
            hasError = true;
        } else {
            if (!email.hasClass('mb-4')) {
                email.addClass('mb-4');
            }
        }


        if (!hasError) {
            $.ajax({
                method: "POST",
                // type: "GET",
                // url: "https://webhook.site/cf5574e1-1893-432e-8ca2-d281c3bdc829",
                url: "http://testologia.ru/checkout",
                data: {
                    name: name.val(), phone: phone.val(), email: email.val(),
                    razmer_Uch: dataOne.razmer_Uch, udal_Form_Irkutsk: dataOne.udal_Form_Irkutsk,
                    toposemkA: dataOne.toposemkA, time_Work: dataOne.time_Work, types_of_Work1: dataOne.types_of_Work1,
                    types_of_Work2: dataOne.types_of_Work2
                },
                success: function (data) {
                    alert(data);
                    console.dir(data);
                },
                error: function (jqXHR, exception) {
                    if (jqXHR.status === 0) {
                        alert('Not connect. Verify Network.');
                    } else if (jqXHR.status === 404) {
                        alert('Requested page not found (404).');
                    } else if (jqXHR.status === 500) {
                        alert('Internal Server Error (500).');
                    } else if (exception === 'parsererror') {
                        alert('Requested JSON parse failed.');
                    } else if (exception === 'timeout') {
                        alert('Time out error.');
                    } else if (exception === 'abort') {
                        alert('Ajax request aborted.');
                    } else {
                        alert('Uncaught Error. ' + jqXHR.responseText);
                    }
                    event.preventDefault()
                    // event.stopPropagation()
                }


            })
            // .done(function (message) {
            //     // loader.hide();
            //     if (message.success) {
            //         alert('Заказ создан');
            //     } else {
            //         alert('Заказ не создан');
            //     }
            //     console.log(message);
            //     console.log(message.success);
            //     console.log(message.errors);
            // });


            // }, false)
        } else {
            event.preventDefault()
            // event.stopPropagation()
        }
        return false;
    });
});
