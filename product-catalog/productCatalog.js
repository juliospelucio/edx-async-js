function createTableHeader(tableId) {
    var tableHeaderRow = document.createElement('TR');
    var th1 = document.createElement('TH');
    var th2 = document.createElement('TH');
    var th3 = document.createElement('TH');
    var th4 = document.createElement('TH');
    th1.appendChild(document.createTextNode("ProductId"));
    th2.appendChild(document.createTextNode("Type"));
    th3.appendChild(document.createTextNode("Price"));
    th4.appendChild(document.createTextNode("Examine"));
    tableHeaderRow.appendChild(th1);
    tableHeaderRow.appendChild(th2);
    tableHeaderRow.appendChild(th3);
    tableHeaderRow.appendChild(th4);
    document.getElementById(tableId).appendChild(tableHeaderRow);
}

function updateTable(tableId, productArray) {
    var tableBody = document.getElementById(tableId);
    //reset table
    while (tableBody.hasChildNodes()) {
        tableBody.removeChild(tableBody.firstChild);
    }
    // console.log(this.parentNode.parentNode);

    //create table header
    createTableHeader(tableId);
    //populate table rows
    for (i = 0; i < productArray.length; i++) {
        var tr = document.createElement('TR');
        var td1 = document.createElement('TD');
        var td2 = document.createElement('TD');
        var td3 = document.createElement('TD');
        var td4 = document.createElement('TD');
        var btn = document.createElement('button');


        btn.addEventListener('click', function () {
            processSearch(this.parentNode.parentNode.firstChild.innerHTML);
        });

        td1.appendChild(document.createTextNode(productArray[i].id));
        td2.appendChild(document.createTextNode(productArray[i].type));
        td3.appendChild(document.createTextNode(productArray[i].price));
        btn.appendChild(document.createTextNode("Examine"))
        td4.appendChild(btn);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tableBody.appendChild(tr);
    }
}

function updateExaminedText(product) {
    var outputString = "Product Id: " + product.id;
    outputString += "<br> Price: " + product.price;
    outputString += "<br> Type: " + product.type;
    document.getElementById("productText").innerHTML = outputString;
}

function getIntersection(arrA, arrB, searchedId) {

    var samePrice = arrA;
    var sameType = arrB;
    var similarArray = [];
    samePrice.forEach(function (obj1) {
        sameType.forEach(function (obj2) {
            if (obj1.id == obj2.id && obj1.id != searchedId)
                similarArray.push(obj1);
        });
    });

    return similarArray;

}

function processSearch(searchId) {
    api.searchProductById(searchId).then(function (val) {
        return Promise.all([api.searchProductsByPrice(val.price, 50), api.searchProductsByType(val.type), val]);
    }).then(function (val) {
        var similarArray = getIntersection(val[0], val[1], val[2].id);
        updateExaminedText(val[2]);
        updateTable('similarTable', similarArray);
    }).catch(function (val) {
        alert(val);
    });
}

function processType(type) {
    api.searchProductsByType(type).then(function (val) {
        console.log(val);
        updateTable('similarTable', val);
    }).catch(function (val) {
        alert(val);
    });
}

function processPrice(price) {
    api.searchProductsByPrice(price, 50).then(function (val) {
        console.log(val);
        updateTable('similarTable', val);
    }).catch(function (val) {
        alert(val);
    });
}

api.searchAllProducts().then(function (value) {
    updateTable('allTable', value);
});

document.getElementById('searchId').addEventListener('click', function () {
    processSearch(document.getElementById('inputId').value);
});

document.getElementById('searchType').addEventListener('click', function () {
    processType(document.getElementById('inputType').value);
});

document.getElementById('searchPrice').addEventListener('click', function () {
    processPrice(document.getElementById('inputPrice').value);
});