import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Patient } from 'src/app/classes/patient';
import { RendezVous } from 'src/app/classes/rendez-vous';
import { PatientService } from 'src/app/services/patient.service';
import { RendezVousService } from 'src/app/services/rendez-vous.service';

@Component({
  selector: 'app-rendez-vous',
  templateUrl: './rendez-vous.component.html',
  styleUrls: ['./rendez-vous.component.css']
})
export class RendezVousComponent implements OnInit{
  pat!:Patient;
  highlightedDate: Date | null = null;
  heure!:String;
  text!:String;
  finDate!:Date;
  debutDate!:Date;
  clickedDate!: Date;
  seen:boolean=false;
  unavailableDates: Date[] = [new Date(2024, 4, 10), new Date(2024, 4, 15)];
  rvs:RendezVous[]=[];

  //selectedDate!: Date;
  //  appointments: RendezVous[] = [
  //   {
  //     id_rendez_vous:1,
     
  //     startDate: new Date('2024-04-27T16:30:00.000Z'),
  //     endDate: new Date('2024-04-27T18:30:00.000Z'),
     // heure:3,
      // text: 'patient amir pneumonie',
      
      //allDay: true,
    // }, {
    //   id_rendez_vous:2,
      
    //   startDate: new Date('2024-04-24T19:00:00.000Z'),
    //   endDate: new Date('2024-04-24T20:00:00.000Z'),
      //heure:3,
      // text: 'patient emna grippe',
     
      //allDay: true,
    // }]
  patientsTest:Patient[]=[];
  patients:Patient[]=[];
  id:number=0;
  //appointmentsData!: RendezVous[];
  constructor(private rdvService:RendezVousService,private fb:FormBuilder,private patientServ:PatientService,
    private route:ActivatedRoute,private router:Router)
{}
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
    });


    // this.patientsTest=this.patientServ.getPatientsTest();
    // this.patientServ.getPatients().subscribe(data=>this.patients=data);
    this.rdvService.getrv().subscribe(data=>this.rvs=data);
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
  
    });
  }

  
  
    
  currentDate: Date = new Date(2024, 3, 29);
  ondelete(e:any){
  e.cancel=true;
  }
  
  disableAllCells(data: any) {
    this.clickedDate= data.cellData.startDate;

    data.cancel = true;
    this.debutDate=this.clickedDate; 
    this.seen=!this.seen;
  }
  disableAppointmentForm(data: any) {
    data.cancel = true; 
   }
  
   AllerVers(path: string): void {
    this.router.navigate([path], { queryParams: { id:this.id} });
  } 

}