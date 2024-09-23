import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private apiUrl ="http://localhost:3000";
  private reservations: Reservation[] = [];

  constructor(private http: HttpClient){

  }

  // constructor(){ // Il costruttore viene chiamato prima del ciclo di vita della pagina
  //   let savedReservations = localStorage.getItem("reservations");
  //   this.reservations = savedReservations ? JSON.parse(savedReservations) : [];
  // }

  //CRUD

  getReservations(): Observable<Reservation[]>{ // Con Observable viene attesa la risposta allà api (Async?)
    return this.http.get<Reservation[]>(this.apiUrl + "/reservations");
  }

  getReservation(id: string): Observable<Reservation>{
    return this.http.get<Reservation>(this.apiUrl + "/reservation/" + id);

  }

  addReservation(reservation: Reservation): Observable<void>{
    // reservation.id = Date.now().toString();
    return this.http.post<void>(this.apiUrl + "/reservation", reservation);

    // this.reservations.push(reservation);
    // localStorage.setItem("reservations", JSON.stringify(this.reservations));
  }

  deleteReservation(id: string): Observable<void>{
    return this.http.delete<void>(this.apiUrl + "/reservation/" + id);

    // let index = this.reservations.findIndex(res => res.id === id);
    // this.reservations.splice(index, 1);
    // localStorage.setItem("reservations", JSON.stringify(this.reservations));
  }

  updateReservation(id: string, updatedReservation: Reservation): Observable<void>{
    return this.http.put<void>(this.apiUrl + "/reservation/" + id, updatedReservation);
    // let index = this.reservations.findIndex(res => res.id === id);
    // this.reservations[index] = updatedReservation;
    // localStorage.setItem("reservations", JSON.stringify(this.reservations));
  }
}
