using {Media.db as db } from '../db/media' ;

service media @(){
    entity MediaFile as projection on db.mediaFile;
     
}