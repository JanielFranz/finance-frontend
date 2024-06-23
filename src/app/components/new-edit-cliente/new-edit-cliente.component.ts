import { Component,Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ClienteService } from 'src/app/services/cliente.service';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-edit-cliente',
  templateUrl: './new-edit-cliente.component.html',
  styleUrls: ['./new-edit-cliente.component.css']
})
export class NewEditClienteComponent implements OnInit{

  clienteForm:FormGroup;

  constructor(
    private _fb:FormBuilder,
    private clienteService:ClienteService,
    private _dialogRef: MatDialogRef<NewEditClienteComponent>,
    private snackbar:MatSnackBar, 
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) {
    this.clienteForm=this._fb.group({
      name:'',
      lastName:'',
      dni:'',
      email:'',
      password: "123"
    })
  }

  onSubmitFunction(){
    if(this.clienteForm.valid){
        this.clienteService.addCliente(this.clienteForm.value).subscribe({
          next:()=>{
            this.snackbar.open("El cliente se agregó correctamente","OK",{duration:3000});
            this._dialogRef.close(true);
            this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => 
            { this.router.navigate(['clientes']); }); 
          },
          error:(err:any)=>{
            console.error(err);
          },
        });
      }
    }
  
  ngOnInit(): void {
    this.clienteForm.patchValue(this.data);
  }

}
