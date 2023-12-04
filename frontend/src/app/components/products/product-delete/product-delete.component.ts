import { ActivatedRoute, Router } from "@angular/router";
import { ProductService } from "./../product.service";
import { Component, OnInit } from "@angular/core";
import { Product } from "../product.model";

@Component({
    selector: "app-product-delete",
    templateUrl: "./product-delete.component.html",
    styleUrl: "./product-delete.component.css",
})
export class ProductDeleteComponent implements OnInit {
    product: Product = {
        name: "",
        price: null,
    };

    constructor(
        private productService: ProductService,
        private router: Router,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get("id");
        if (id !== null && id !== undefined) {
            const idString = id.toString();
            this.productService.readByID(idString).subscribe((product) => {
                this.product = product;
            });
        } else {
            console.error("O id é nulo ou indefinido.");
        }
    }

    deleteProduct(): void {
        const id = this.route.snapshot.paramMap.get("id");
        if (id !== null && id !== undefined) {
            const idString = id.toString();
            this.productService.delete(idString).subscribe(() => {
                this.productService.showMessage("Produto excluido com sucesso!");
                this.router.navigate(["/products"]);
            });
        } else {
            console.error("O id é nulo ou indefinido.");
        }
       
    }

    cancel(): void {
        this.router.navigate(["/products"]);
    }
}
