import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CronogramaService } from 'src/app/services/cronograma.service';
import { ActivatedRoute } from '@angular/router';
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-cotizaciones',
  templateUrl: './cotizaciones.component.html',
  styleUrls: ['./cotizaciones.component.css']
})
export class CotizacionesComponent implements OnInit{
  cliente_id!: number;

  displayedColumns: string[] = ['cliente_id','marca','modelo','moneda','ncuotas',
  'precio','pgracia','tasa','pcuotainicial','id','accion'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private cronogramaService: CronogramaService, private activated: ActivatedRoute) { }

  ngOnInit(): void {
      this.getCotizacionesIdList();
  }

  getCotizacionesIdList(){
    this.cliente_id = this.activated.snapshot.params['id'];
    this.cronogramaService.getCronogramasByClientId(this.cliente_id).subscribe({
      next:(res)=>{
        this.dataSource=new MatTableDataSource(res);
        this.dataSource.sort=this.sort;
        this.dataSource.paginator=this.paginator;
      },
      error:console.log,
    });
  }

}
