// ANGULAR
import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

// PRIME NG
import { PrimeNG } from "primeng/config";
import { Toast } from "primeng/toast";

// DATE FNS
// TODO DECOMMENTER SI SOUCIS AVEC DATE FNS
/* import { setDefaultOptions } from "date-fns";
import { fr } from "date-fns/locale"; */

// TODO voir https://angular.dev/guide/animations pour les animations

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, Toast],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  title = "k9-club";

  constructor(private primeng: PrimeNG) {
    // TODO DECOMMENTER SI SOUCIS AVEC DATE FNS
    /* setDefaultOptions({ locale: fr }); */
  }

  ngOnInit() {
    this.primeng.ripple.set(true);
  }
}
