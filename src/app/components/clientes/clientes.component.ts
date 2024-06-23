import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import { ClienteService } from 'src/app/services/cliente.service';
import { MatDialog } from "@angular/material/dialog";
import { NewEditClienteComponent } from '../new-edit-cliente/new-edit-cliente.component';
import { CronogramaService } from 'src/app/services/cronograma.service';
import {CronogramaComponent} from "../cronograma/cronograma.component";



@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit{
  displayedColumns: string[] = ['acciones','id','cliente','dni','email','cotizacion'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private clienteService: ClienteService, private _dialog: MatDialog,private snackbar:MatSnackBar) { }

  ngOnInit(): void {
      this.getClientesList();
  }

  getClientesList(){
    this.clienteService.getClientes().subscribe({
      next:(res)=>{
        this.dataSource=new MatTableDataSource(res);
        this.dataSource.sort=this.sort;
        this.dataSource.paginator=this.paginator;
      },
      error:console.log,
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addClienteForm(){
    const dialogRef=this._dialog.open(NewEditClienteComponent);
    dialogRef.afterClosed().subscribe({
      next:(val)=>{
        if(val){
          this.clienteService.getClientes();
        }
      }
    })
  }

  openEditForm(data:any){
    this._dialog.open(NewEditClienteComponent,{
      data,
    });
  }



  deleteCliente(id:number){
    this.clienteService.deleteCliente(id).subscribe({
      next:()=>{
        this.snackbar.open("El cliente se eliminó correctamente","OK",{duration:3000});
        this.getClientesList();
      },
      error:console.log,
    });
  }

}
