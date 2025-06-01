// ANGULAR
import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { k9Config } from "@config/global";
import { BehaviorSubject } from "rxjs";

// SERVICES
import { ToastMessageService } from "@services/toast/toast-message.service";

@Injectable({
  providedIn: "root",
})
export class DogService {
  http: HttpClient = inject(HttpClient);
  toastService: ToastMessageService = inject(ToastMessageService);

  readonly dogs$ = new BehaviorSubject<DogDto[]>([]);

  getAllDogs() {
    this.http.get<DogDto[]>(k9Config.apiRoot + "/owner/dogs").subscribe({
      next: (dogs) => {
        this.dogs$.next(dogs);
      },
      error: (error) => {
        console.error("Erreur fetching owner's dogs : ", error);
        this.toastService.show({
          severity: "error",
          title: "Récupération des chiens",
          content:
            "Une erreur est survenue lors de la récupération des informations de vos chiens.",
          sticky: true,
        });
      },
    });
  }

  addDog(dogForm: AddDogFormDto, ownerId: number) {
    const body = {
      name: dogForm.name,
      birthdate: dogForm.birthdate,
      gender: dogForm.gender,
      avatarUrl: dogForm.avatarUrl,
      ownerId: ownerId,
      breedId: dogForm.breedId,
    };

    return this.http.post(`${k9Config.apiRoot}/dog`, body);
  }

  /* TODO AJOUTER LES AUTRES PARTIES DU CRUD */
}
