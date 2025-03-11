import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Session } from '../domain/session.model';
import { SpeakerSession } from '../domain/speaker-session.model';
import { Voting } from '../domain/voting.model';
import { ParlamentarPresenceDTO } from '../dto/parlamentar-presence-dto.model';
import { SessionDTOCreate } from '../dto/session-dto-create.model';
import { SessionParlamentarDTO } from '../dto/session-parlamentar-dto.model';
import { SessionVotingInfoDTO } from '../dto/session-voting-info-dto.model';
import { SubjectVotingDTO } from '../dto/subject-voting-dto.model';
import { VoteDTO } from '../dto/vote-dto.model';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private baseUrl = environment.apiUrl + '/sessions';
  private checkOpenSessionURL = '/check/townhall/{id}';
  private findSessionTodayByTownhallURL = '/find/townhall/{id}';
  private createVotingUrl = '/{uuid}/voting';
  private computeVoteUrl = '/{uuid}/voting';
  private closeVotingUrl = '/{uuid}/voting/close';
  private subscriptionSpeakerListURL = '/{uuid}/speakers';
  private unSubscriptionSpeakerListURL = '/{uuid}/speakers/{id}/type/{type}';
  private updateParlamentarPresenceURL = '/{uuid}/presence-list';
  private updateParlamentarPresenceListURL = '/{uuid}/presence-list/manually/';
  private findSessionVotingInfoBySessionAndVotingIdURL = '/{uuid}/voting-info/{id}';
  private resetSessionVotingInfoBySessionAndVotingIdURL = '/{uuid}/voting-info/reset/{id}';
  private findSessionStandardInfoByUUIDURL = '/{uuid}/voting-info/standard';

  constructor(private http: HttpClient) {
  }

  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  create(sessionDTOCreate: SessionDTOCreate) : Observable<Session>{
    return this.http.post<Session>(this.baseUrl, sessionDTOCreate);
  }

  delete(sessionUUID: string){
    return this.http.delete(this.baseUrl + '/' + sessionUUID, this.httpOptions);
  }

  checkIfExistsOpenSessionToday (townHallId : number){
    return this.http.get<boolean>(this.baseUrl + this.checkOpenSessionURL.replace('{id}', townHallId + ''));
  }

  findSessionTodayByTownhall (townHallId : number): Observable<SessionParlamentarDTO>{
    return this.http.get<SessionParlamentarDTO>(this.baseUrl + this.findSessionTodayByTownhallURL.replace('{id}', townHallId + ''));
  }

  createVoting(sessionUUID: string, subjectDTOList: SubjectVotingDTO[]) : Observable<Voting>{

    return this.http.post<Voting>(this.baseUrl + this.createVotingUrl.replace('{uuid}', sessionUUID), subjectDTOList);
  }

  findByUUID(sessionUUID: string): Observable<Session>{
    return this.http.get<Session>(this.baseUrl + '/' + sessionUUID);
  }

  subscriptionInSpeakerList(sessionUUID : string, speakerDTO : any): Observable<SpeakerSession>{
    return this.http.post<SpeakerSession>(this.baseUrl + this.subscriptionSpeakerListURL.replace('{uuid}', sessionUUID), speakerDTO);
  }

  unsubscribeSpeaker(sessionUUID : string, speakerId: number, type: string){
    let finalUrl = this.unSubscriptionSpeakerListURL.replace('{uuid}', sessionUUID).replace('{id}', speakerId + '').replace('{type}', type);
    return this.http.delete(this.baseUrl + finalUrl);
  }

  updateParlamentarPresence(sessionUUID : string, parlamentarPresenceDTO : ParlamentarPresenceDTO){
    return this.http.put(this.baseUrl + this.updateParlamentarPresenceURL.replace('{uuid}', sessionUUID), parlamentarPresenceDTO);
  }

  updateParlamentarPresenceList(sessionUUID: string, parlamentarIdList: number[]){
    return this.http.put(this.baseUrl + this.updateParlamentarPresenceListURL.replace('{uuid}', sessionUUID), parlamentarIdList); 
  }

  computeVote(sessionUUID: string, vote : VoteDTO): Observable<void>{
    return this.http.put<void>(this.baseUrl + this.computeVoteUrl.replace('{uuid}', sessionUUID), vote);
  }

  closeVoting(sessionUUID: string): Observable<any>{
    return this.http.put<any>(this.baseUrl + this.closeVotingUrl.replace('{uuid}', sessionUUID), null);
  }

  findSessionVotingInfoBySessionAndVotingId(sessionUUID: string, id: number) : Observable<SessionVotingInfoDTO>{
    return this.http.get<SessionVotingInfoDTO>(this.baseUrl + this.findSessionVotingInfoBySessionAndVotingIdURL.replace('{uuid}', sessionUUID).replace('{id}', id + ''));
  }

  resetSessionVotingInfoBySessionAndVotingId(sessionUUID: string, id: number) : Observable<SessionVotingInfoDTO>{
    return this.http.get<SessionVotingInfoDTO>(this.baseUrl + this.resetSessionVotingInfoBySessionAndVotingIdURL.replace('{uuid}', sessionUUID).replace('{id}', id + ''));
  }

  findSessionStandardInfoByUUID(sessionUUID: string) : Observable<SessionVotingInfoDTO>{
    return this.http.get<SessionVotingInfoDTO>(this.baseUrl + this.findSessionStandardInfoByUUIDURL.replace('{uuid}', sessionUUID));
  }

  addSubjectManually(sessionUUID: string, addSubjectRequest) : Observable<Session>{
    console.log(this.baseUrl + '/' + sessionUUID + '/subjects', sessionUUID, addSubjectRequest);
    return this.http.post<Session>(this.baseUrl + '/' + sessionUUID + '/subjects', addSubjectRequest);
  }

  deleteSubjectManually(sessionUUID: string, subjectId: number){
    return this.http.delete(this.baseUrl + '/' + sessionUUID + '/subjects/' + subjectId, this.httpOptions);
  }

}
