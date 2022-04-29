import { Injectable } from '@nestjs/common';
import { CommonService } from '../common/common.service';
import { IO } from '../common/util/io/io.service';
import { Logger } from '@nestjs/common';

import * as selfsigned from 'selfsigned';

import * as boxen from 'boxen';

@Injectable()
export class SystemService {
  private static readonly logger = new Logger(SystemService.name);
  static readonly Server: string = 'EmuTypekov';
  static readonly Version: string = '0.0.1-dev';
  static readonly Website: string = 'github.com/kiobu/emutypekov';
  static readonly Watermark: string =
    '\n' +
    boxen(
      `${SystemService.Server}\nv${SystemService.Version}\n${SystemService.Website}`,
      {
        padding: 1,
        margin: 1,
        align: 'center',
      },
    );

  // No need for this anymore since SPT-AKI modules don't require an SSL cert, but it's here for posterity.
  static generateCert() {
    const ALWAYS_REGENERATE = false;

    if (ALWAYS_REGENERATE) {
      this.logger.log('ALWAYS_GENERATE = TRUE');
    }

    // Manually create common service because we can't get context before the Nest IoC container is created.
    // TODO: Maybe we should move this to a non-Nest static container? As it stands, we're techically using
    // 'SystemService' before Nest ever actually instantiates it/resolves dependencies. Works for now, though.
    const common = new CommonService();

    const dir = IO.resolve('misc');
    const certFile = IO.resolve(dir, 'cert.pem');
    const keyFile = IO.resolve(dir, 'key.pem');

    let cert, key;

    if (!IO.exists(certFile) || !IO.exists(keyFile) || ALWAYS_REGENERATE) {
      let fingerprint;
      const daysValid = 1825;

      ({
        cert,
        private: key,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        fingerprint,
      } = selfsigned.generate(null, {
        keySize: 2048, // the size for the private key in bits (default: 1024)
        days: daysValid, // how long till expiry of the signed certificate (default: 365)
        algorithm: 'sha256', // sign the certificate with specified algorithm (default: 'sha1')
        extensions: [
          {
            name: 'commonName',
            cA: true,
            value: common.serverConfig.address + '/',
          },
        ], // certificate extensions array
        pkcs7: true, // include PKCS#7 as part of the output (default: false)
        clientCertificate: true, // generate client cert signed by the original key (default: false)
        clientCertificateCN: 'jdoe', // client certificate's common name (default: 'John Doe jdoe123')
      }));

      this.logger.log(
        `Generated X.509 cert in ${dir}, valid for ${daysValid} days.`,
      );

      IO.writeFileSync(certFile, cert);
      IO.writeFileSync(keyFile, key);

      return { cert, key };
    } else {
      if (IO.exists(certFile) && IO.exists(keyFile)) {
        this.logger.log(`Found existing X.509 cert in ${dir}.`);

        cert = IO.readFileSync(certFile);
        key = IO.readFileSync(keyFile);

        return { cert, key };
      }
    }
  }

  constructor(private readonly common: CommonService) {}
}
