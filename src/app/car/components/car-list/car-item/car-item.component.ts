import { Component, OnInit, Input } from '@angular/core';
import { ICar } from 'src/app/shared/interfaces/ICar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-car-item',
  templateUrl: './car-item.component.html',
  styleUrls: ['./car-item.component.scss']
})
export class CarItemComponent implements OnInit {
  @Input('car-item') car: ICar;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onClick(id: string){
      this.router.navigate(['/car', id])
  }

}
