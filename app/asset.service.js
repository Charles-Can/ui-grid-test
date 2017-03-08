const Guid = require('guid');
const Moment = require('moment');

export class AssetService {
  constructor( $q ) {
    this.$q = $q;
  }

  generateAssets( count=25, days=1 ) {
    let def = this.$q.defer();
    let assets = [];
    for( let i=0; i < count; i++ ) {
      assets.push( this.generateDays( {
        assetId: `Asset_${Guid.create().value.substring( 0, 8 )}`,
        make: Guid.create().value,
        serialNumber: Guid.create().value
      }, days ) );
    }
    def.resolve(assets);
    return def.promise;
  }

  generateActualPayload( count=25, days=1 ) {
    let def = this.$q.defer();
    let assets = [];
    for( let i=0; i < count; i++ ) {
      assets.push({
        assetId: `Asset_${Guid.create().value.substring( 0, 8 )}`,
        make: Guid.create().value,
        serialNumber: Guid.create().value,
        assetLocalDates: this.generateLocalDates(count,days)
      });
    }
    def.resolve(assets);
    return def.promise;
  }

  generateLocalDates( asset, offset=1 ) {
    const today = Moment();
    const start = Moment().subtract( offset, 'days' );
    const dates = [];
    let i=0;
    while( !today.isSame( start.clone().add( i, 'days' ), 'days' ) ) {
      dates.push({
        assetLocalDate: start.clone().add( i, 'days' ).format( 'MM/DD/YYYY' ),
        segmentDuration: {
          runningDurationSeconds: this.generateRandomRuntime(),
          idleDurationSeconds: this.generateRandomIdlePercentage(),
          workingDurationSeconds: 0
        }
      });
      i++;
    } 
    return dates;
  } 

  generateDays( asset, offset=1 ) {
    const today = Moment();
    const start = Moment().subtract( offset, 'days' );
    let i=0;

    while( !today.isSame( start.clone().add( i, 'days' ), 'days' ) ) {
      asset[start.clone().add( i, 'days' ).format( 'MM/DD/YYYY' )] = {
        runningDurationSeconds: this.generateRandomRuntime(),
        idleDurationSeconds: this.generateRandomIdlePercentage(),
        workingDurationSeconds: 0
      };
      i++;
    } 
    return asset;
  }

  generateRandomRuntime() {
    return ( Math.random() * 24 ).toFixed(1);
  }

  generateRandomIdlePercentage() {
    return Math.floor( ( Math.random() * 100 ) + 1 );
  }
};