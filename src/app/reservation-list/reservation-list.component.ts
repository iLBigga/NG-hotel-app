import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../reservation/reservation.service';
import { Reservation } from '../models/reservation';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css']
})
export class ReservationListComponent implements OnInit{

  reservations: Reservation[] = [];

  constructor(private reservationService: ReservationService){} // Injection service all'interno del componente cosi da poter usare i vari metodi

  ngOnInit(): void {
    this.reservationService.getReservations().subscribe(reservations => { // Per i metodi Observable si utilizza subribe per attendere la risposta (Await?)
      this.reservations = reservations
    });
  }

  deleteReservation(id: string){
    this.reservationService.deleteReservation(id).subscribe(() => {
      console.log("Delete request got processed.")
    });
  }

}
