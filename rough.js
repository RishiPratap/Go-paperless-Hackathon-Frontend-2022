import HelloSign from 'hellosign-embedded';


const client = new HelloSign({
  clientId: '7c6cd4722bf993f3508d03033f104bce'
});

function launchHelloSign(url) {
  client.open(url, {
    skipDomainVerification: true,
    debug: true,
    allowCancel: true,
  });
}

launchHelloSign("https://app.hellosign.com/editor/embeddedSign?signature_id=a688a71c4291156a4e125181b8ecaa78&token=504f81343b9e2a6dc2cb8fb2c83810cd");


