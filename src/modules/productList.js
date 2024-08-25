import supabaseClient from "../backend/supabase/index.js";

function showProduct(products){
    let newTableBody = document.createElement('tbody');
    products.map((product)=>{
        const {product_id,name,description,price,quantity,image_url,category_id} = product;
        let newRow = document.querySelector('.product').cloneNode(true);
        let newRowCell = newRow.firstElementChild;
        let dataInList = [name, quantity, category_id, price];
        for(let i = 0 ; i < dataInList.length;i++){
            newRowCell.innerHTML = dataInList[i];
            newRowCell = newRowCell.nextElementSibling;
        }
        let actionsCell = document.createElement('td');
        let editBtn = document.createElement('button');
        let deleteBtn = document.createElement('button');
        actionsCell.className = "flex space-x-4 justify-center py-4";
        editBtn.className = "font-medium text-blue-600 hover:underline edit";
        deleteBtn.className = "font-medium text-red-600 hover:underline delete";
        editBtn.innerText = "Edit";
        deleteBtn.innerText = "Delete";
        actionsCell.append(editBtn,deleteBtn);
        newRow.append(actionsCell);
        newTableBody.append(newRow);
    })
    console.log(newTableBody);
    document.querySelector('.products-list').replaceWith(newTableBody);
};

(async function getProducts() {
    const { data, error } = await supabaseClient.from("products").select();
    if (error) {
        console.error("Error fetching products:", error);
        return;
    }
    console.log(data, error);
    showProduct(data);
})();
