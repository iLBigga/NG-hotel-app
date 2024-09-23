import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReservationService } from '../reservation/reservation.service';
import { Reservation } from '../models/reservation';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css']
})
export class ReservationFormComponent implements OnInit{

  reservationForm: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private reservationService: ReservationService,
    private router: Router,
    private activatedRoute: ActivatedRoute){
  } // Injection service all'interno del componente cosi da poter usare i vari metodi

  ngOnInit(): void {
    this.reservationForm = this.formBuilder.group({
      checkInDate:  ['', Validators.required],
      checkOutDate: ['', Validators.required],
      guestName:    ['', Validators.required],
      guestEmail:   ['', [Validators.required, Validators.email]],
      roomNumber:   ['', Validators.required]
    })

    let id = this.activatedRoute.snapshot.paramMap.get('id');

    if(id){
      this.reservationService.getReservation(id).subscribe(reservation => {
        if(reservation) this.reservationForm.patchValue(reservation)
      });
    }
  }


  onSubmit(){
    if(this.reservationForm.valid){
      let reservation: Reservation = this.reservationForm.value;

      let id = this.activatedRoute.snapshot.paramMap.get('id');

      if(id){
        //Update reservation
        this.reservationService.updateReservation(id, reservation).subscribe(() => {
          console.log("Update request processed");
        });
      }else{
        //Create reservation
        this.reservationService.addReservation(reservation).subscribe(() => {
          console.log("Create request processed");
        });
      }


      this.router.navigate(['/list']);
    }
  }
}
