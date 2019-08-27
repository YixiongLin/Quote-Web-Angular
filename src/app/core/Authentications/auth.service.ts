import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router'
import { QuoteDataService } from '../http/quote/quote-data.service';

@Injectable()
export class AuthService implements CanActivate {

  private token: string = 'lnpf6DbObf9syuBvEqVRgRg-5ErQjwHxnoAbPUrVER7IRYYTl79OS7_3ccMt0uCiYsI9cGb8fVC1yiLyydxo4qlkwErFeY3rflCP1Cw4_bTubr_bofgN21tKFS-BUieZ22l9_1UHlkLBvzwG6-cV6kKv6L8yrOJaNMD9zEkvq5VUEcXmV005KJ8m14WPYeWR8To5HcjK0lhmAAkrpiW54t62NxBblGpx0PJin5Z5osKw-c-Aim8O_qzU-BslyfGJLX60RjfJjNivEt3nnePmS3dSDfmuNby_pG2TuGTdLWsb7hMIeiv3T4ugUx5tphAeNvxK70DSLzshATRUpMVoRuTK-eF-w54lOZWSk2spxEWcFVHR8fgQnSJb0kQ3on3hUr292ujyyalYlVlxOJ0UbcBPmDxyhrjL3u961mDuQOxmC1UrfwidJNhXmlZy1sYDwdr30sZ2RHGqmOoTqN7-zptv5VXAy9C3DCjkbyo5jobvVMe61AXbD2kRXuGIpG65';
  tokenHTTPS: string = 'Bearer -nj9vmuSBkbs97oT_4wOdhc6XS3fJl0p6QN3tVYft7fCN0jsLcTqJWXvORa5s4qZ1jn4eSJfsChzpPyJlE8mcNV6jJbxZdklnPibSZIGuMSpnxDXl74OxpRvJ21TvXaQK3CYhrd_OiD3gYeu78sTrDJSohGMBqi5KwKaeyuEptzvSZr425a6nAYjLPdLzMtFljvp7AuhLWpu66D9qxvdgOvZJi-4UbviHvxrulNf8bBFo7ufhTwj5ivSd61vYxYeEXbAMzRB9bkX4cQlh8U-Z7qix8m-ymStTwNJtNW-TyMRNO6KZRfFFgRp_0IuOrKiTTbrMhfECLnU8QWNxMgDgdsf_K1QMKbNzfq7hbs010W2FUOZlPzkG6FwPTvyafZVQmOBtuEr4yBxtXWeQ0yZ4aWDWwpxa9BmB588KKuk608nuR-SgWxEH4XS0iEtqLUq2R1vuicP7Lm8My80NeukTWM1yEac97xMRgkwORn1ZWR3JVfWANGM1AzrdQipmRdF';
  constructor(private quoteService: QuoteDataService) { }

  canActivate(){
    return this.quoteService.isUserLogin();
  }
  
  getToken(){
    return this.token;
  }
}
