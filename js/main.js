
$(function(){

    var model = {
        init: function() {
            localStorage.clear();
            if (!localStorage.cats) {
                localStorage.cats = JSON.stringify([]);
            }
        },
        //takes new object to save into localstorage
        add: function(obj) {
            var data = JSON.parse(localStorage.cats);
            data.push(obj);
            localStorage.cats = JSON.stringify(data);
        },
        //grabs all cats in localstorage
        getAllCats: function() {
            return JSON.parse(localStorage.cats);
        },
        saveCat: function(cat) {
            localStorage.setItem('cat', JSON.stringify(cat));
        }
    };


    var octopus = {
        addNewCat: function(selectedName, selectedImage, selectedClicks) {
            model.add({
                name: selectedName,
                image: selectedImage,
                clicks: selectedClicks
            });
        },
        //grabs the cats
        getCats: function() {
            return model.getAllCats();
        },
        saveCat: function(cat) {
            model.saveCat(cat);
        },
        //launches the model and view
        init: function() {
            model.init();
            octopus.addNewCat("Xuxa", "images/cat.jpg", 0);
            octopus.addNewCat("Chewie", "images/cat2.jpg", 0);
            octopus.addNewCat("Grumpy", "images/cat3.jpg", 0);
            octopus.addNewCat("Bowie", "images/cat4.jpg", 0);
            octopus.addNewCat("Lion", "images/cat5.jpg", 0);
            catView.init();
        }
    };


    var catView = {
        //
        init: function() {
            catView.render();
        },
        //
        render: function() {
            var cats = octopus.getCats();

            catView.initialCat(cats[0]);
            catView.catSelect(cats);
            catView.onClicks(cats);
        },
        initialCat: function(cat) {
            $('#cat-name').text(cat.name);
            $('#cat-image').attr("src", cat.image);
            $('#clicks').text(cat.clicks);
        },
        displayCat: function(name, cats) {
            for (var i = 0; i < cats.length; i++) {
                if (name == cats[i].name) {
                    $('#cat-name').text(cats[i].name);
                    $('#cat-image').attr("src", cats[i].image);
                    $('#clicks').text(cats[i].clicks);
                }
            }
        },
        catSelect: function(cats) {
            for (var i = 0; i < cats.length; i++) {
                var name = cats[i].name;
                var ul = document.getElementById('cat-names');
                var li = document.createElement('li');
                var text = document.createElement('span');

                text.innerText = name;
                li.appendChild(text);

                li.addEventListener('click', (function(nameCopy) {
                    return function() {
                        catView.displayCat(nameCopy, cats);
                    };
                })(name));

                ul.appendChild(li);
            }
        },
        onClicks: function(cats) {
            $('#cat-image').click(function() {
                var name = $('#cat-name').text();

                for (var i = 0; i < cats.length; i++) {
                    if (cats[i].name === name) {
                        cats[i].clicks = parseInt(cats[i].clicks) + 1;
                        $('#clicks').text(cats[i].clicks);
                        octopus.saveCat(cats[i]);
                    }
                }
            });
            $('#admin').click(function(e) {
                $('#admin-menu').removeClass("hidden");
                var name = $('#cat-name').text();

                for (var i = 0; i < cats.length; i++) {
                    if (cats[i].name === name) {
                        $('#admin-name').val(cats[i].name);
                        $('#admin-imageURL').val(cats[i].image);
                        $('#admin-clicks').val(cats[i].clicks);
                    }
                }
            });
            $('#cancel').click(function(e) {
                $('#admin-menu').addClass("hidden");
            });
            $('#save').click(function(e) {
                var name = $('#cat-name').text();

                for (var i = 0; i < cats.length; i++) {
                    if (cats[i].name === name) {
                        $('#cat-names li').each(function(idx, li) {
                            if (li.firstChild.textContent === cats[i].name) {
                                li.firstChild.textContent = $('#admin-name').val();
                            }
                        });

                        cats[i].name = $('#admin-name').val();
                        cats[i].image = $('#admin-imageURL').val();
                        cats[i].clicks = $('#admin-clicks').val();

                        $('#cat-name').text(cats[i].name);
                        $('#cat-image').attr("src", cats[i].image);
                        $('#clicks').text(cats[i].clicks);
                    }
                }
                $('#admin-menu').addClass("hidden");
            });
        }
    };

    octopus.init();
});