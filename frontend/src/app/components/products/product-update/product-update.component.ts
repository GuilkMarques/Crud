import { Product } from "./../product.model";
import { Component, OnInit } from "@angular/core";
import { ProductService } from "../product.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: "app-product-update",
    templateUrl: "./product-update.component.html",
    styleUrl: "./product-update.component.css",
})
export class ProductUpdateComponent implements OnInit {
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

    updateProduct(): void {
        this.productService.update(this.product).subscribe(() => {
            this.productService.showMessage("Produto Atualizado com Sucesso!");
            this.router.navigate(["/products"])
        });
    }

    cancel(): void {
        this.router.navigate(["/products"]);
    }
}
