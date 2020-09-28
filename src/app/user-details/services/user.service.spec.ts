
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { API } from 'src/app/shared/constants/const';
import { IAccountType } from 'src/app/shared/interfaces/IAccountType';
import { IContracts } from 'src/app/shared/interfaces/IContracts';
import { IEmploymentType } from 'src/app/shared/interfaces/IEmploymentType';
import { IUserPersonal } from 'src/app/shared/interfaces/IUserPersonal';
import { IUserEmployment } from 'src/app/shared/interfaces/IUserEmployment';
import { IUserBank } from 'src/app/shared/interfaces/IUserBank';

describe('UserService', () => {
    let service: UserService;
    let httpMock: HttpTestingController;
    let fixture: ComponentFixture<UserService>

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule], // inclueds mock implementation of http service
            providers: [UserService]
        })
        service = TestBed.inject(UserService);
        httpMock = TestBed.inject(HttpTestingController);
    })

    afterEach(() => {
        httpMock.verify();
    })

    it('should retrieve all account types via GET', () => {
        const mockResponse: IAccountType[] = [
            { accountTypeId: 1, accountType: 'savings' },
            { accountTypeId: 2, accountType: 'current' },
            { accountTypeId: 3, accountType: 'nri' },
            { accountTypeId: 4, accountType: 'demat' }
        ];
        service.getAccountType().subscribe(res => {
            expect(res.length).toBe(4);
            expect(res).toEqual(mockResponse, 'should return expected results');
        });
        const req = httpMock.expectOne(API.GET_ACCOUNT_TYPES)
        expect(req.request.method).toBe('GET');
        req.flush(mockResponse);
    });

    it('should retrieve all contracts via GET', () => {
        const mockResponse: IContracts[] = [
            { contractId: 1, contractType: 'fulltime' },
            { contractId: 2, contractType: 'parttime' },
            { contractId: 3, contractType: 'trainee' },
            { contractId: 4, contractType: 'premanent' }
        ];
        service.getContracts().subscribe(res => {
            expect(res.length).toBe(4);
            expect(res).toEqual(mockResponse, 'should return expected results');
        });
        const req = httpMock.expectOne(API.GET_CONTRACTS)
        expect(req.request.method).toBe('GET');
        req.flush(mockResponse);
    });

    it('should retrieve all employment types via GET', () => {
        const mockResponse: IEmploymentType[] = [
            { employmentTypeId: 1, employmentType: 'temporary' },
            { employmentTypeId: 2, employmentType: 'services based' },
            { employmentTypeId: 3, employmentType: 'trainee' },
            { employmentTypeId: 4, employmentType: 'premanent' }
        ];
        service.getEmploymentTypes().subscribe(res => {
            expect(res.length).toBe(4);
            expect(res).toEqual(mockResponse, 'should return expected results');
        });
        const req = httpMock.expectOne(API.GET_EMPLOYMENT_TYPES)
        expect(req.request.method).toBe('GET');
        req.flush(mockResponse);
    });

    it('should submit user personal details via POST', () => {
        const mockRequestAndRespond: IUserPersonal = {
            city: '',
            contact: '',
            country: '',
            dob: null,
            firstname: '',
            gender: true,
            houseNo: '',
            lastname: '',
            pincode: '',
            state: '',
            street: '',
            userId: '',
            userPersonalId: 1
        };
        service.submitUserPersonalDetails(mockRequestAndRespond).subscribe(res => {
            expect(res).toEqual(mockRequestAndRespond, 'should return expected results');
        });
        const req = httpMock.expectOne(API.POST_USER_PERSONAL_DATA)
        expect(req.request.method).toBe('POST');
        req.flush(mockRequestAndRespond);
    });

    it('should submit user employment details via POST', () => {
        const mockRequestAndRespond: IUserEmployment = {
            companyAddress: '',
            companyName: '',
            contractId: 1,
            contractType: '',
            creditScore: '',
            employmentType: '',
            employmentTypeId: 1,
            salary: '',
            userEmploymentId: 1,
            userId: ''
        };
        service.submitUserEmploymentDetails(mockRequestAndRespond).subscribe(res => {
            expect(res).toEqual(mockRequestAndRespond, 'should return expected results');
        });
        const req = httpMock.expectOne(API.POST_USER_EMPLOYEMENT_DATA)
        expect(req.request.method).toBe('POST');
        req.flush(mockRequestAndRespond);
    });

    it('should submit user bank details via POST', () => {
        // Arrange
        const mockRequestAndRespond: IUserBank = {
            accountHolderName: '',
            accountNumber: '',
            accountType: '',
            accountTypeId: 1,
            bankAddress: '',
            bankBranch: '',
            bankCountry: '',
            bankName: '',
            bankState: '',
            userBankId: 1,
            userId: ''
        };
        service.submitUserBankDetails(mockRequestAndRespond).subscribe(res => {
            expect(res).toEqual(mockRequestAndRespond, 'should return expected results');
        });
        const req = httpMock.expectOne(API.POST_USER_BANK_DATA)
        expect(req.request.method).toBe('POST');
        req.flush(mockRequestAndRespond);
    });
})