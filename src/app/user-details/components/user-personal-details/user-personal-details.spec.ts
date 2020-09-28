import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserPersonalDetailsComponent} from './user-personal-details.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import { DatePipe } from '@angular/common';
import { first } from 'rxjs/operators';

describe('UserPersonalDetailsComponent', () => {
    let component: UserPersonalDetailsComponent;
    let fixture: ComponentFixture<UserPersonalDetailsComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [UserPersonalDetailsComponent],
        imports: [ 
            ReactiveFormsModule,
            FormsModule,
            HttpClientTestingModule,
            RouterTestingModule,  
            ],
            providers: [
                DatePipe
            ],
            schemas: [NO_ERRORS_SCHEMA]
        });
        fixture = TestBed.createComponent(UserPersonalDetailsComponent);
        component = fixture.componentInstance;
    });

    it('form invalidity when empty', ()=>{
       expect(component.personalForm).toBeFalsy();
    })
});