import { $ } from '@wdio/globals'

class ProductsPage {

    public get searchBar() {
        return $('input[id="search_product"]');
    }

    public get btnSearch() {
        return $('button[id="submit_search"]');
    }

    public get productsDetails() {
        return $('a[href="/product_details/1"]');
    }

    public productName(productName: string) {
        return $(`p=${productName}`);
    }

    public async productSearch(product: string) {
        await this.searchBar.setValue(product);
        await this.btnSearch.click();
    }
}

export default new ProductsPage();