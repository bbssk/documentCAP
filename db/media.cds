namespace Media.db;

using {cuid} from '@sap/cds/common';

entity mediaFile : cuid {
    @Core.ContentDisposition.Filename:fileName
    @Core.MediaType                  : mediaType
    content   : LargeBinary;

    
    fileName  : String;

    @Core.IsMediaType                : true
    mediaType : String;
    url       : String;

}
