const core = require('@actions/core');
const https = require('https');

const SLACK_BOT_TOKEN = process.env.SLACK_BOT_TOKEN;

// most @actions toolkit packages have async methods
async function run() {
  try {
    let attachment = {};
    attachment.fallback = core.getInput('fallback', {
      required: false
    });
    attachment.color = core.getInput('color', {
      required: false
    });
    attachment.pretext = core.getInput('pretext', {
      required: false
    });
    attachment.author_name = core.getInput('author_name', {
      required: false
    });
    attachment.author_link = core.getInput('author_link', {
      required: false
    });
    attachment.author_icon = core.getInput('author_icon', {
      required: false
    });
    attachment.title = core.getInput('title', {
      required: false
    });
    attachment.title_link = core.getInput('title_link', {
      required: false
    });
    attachment.text = core.getInput('text', {
      required: false
    });
    attachment.image_url = core.getInput('image_url', {
      required: false
    });
    attachment.thumb_url = core.getInput('thumb_url', {
      required: false
    });
    attachment.footer = core.getInput('footer', {
      required: false
    });
    attachment.footer_icon = core.getInput('footer_icon', {
      required: false
    });

    const channel = core.getInput('channel', {
      required: true
    });
    // const icon_url = core.getInput('icon_url', {
    //   required: true
    // });
    // const username = core.getInput('username', {
    //   required: true
    // });

    // TODO put back?
    // icon_url: icon_url,
    // username: username,

    const data = JSON.stringify({
      channel: channel,
      as_user: true,
      attachments: [
        // {
        //   "title": `${process.env.GITHUB_REPOSITORY}`,
        //   "title_link": `https://github.com/${process.env.GITHUB_REPOSITORY}`,
        //   "color": attachment.color,
        //   "text": `${process.env.GITHUB_REF}`,
        //   "author_name": `${process.env.GITHUB_ACTOR}`,
    		// 	"author_link": `https://github.com/${process.env.GITHUB_ACTOR}`,
    		// 	"author_icon": `https://github.com/${process.env.GITHUB_ACTOR}.png`,
        //   "footer": `action -> ${process.env.GITHUB_EVENT_NAME}`,
        //   "thumb_url":"https://avatars0.githubusercontent.com/u/44036562?s=200&v=4"
        // },
        attachment
      ]
    })
    
    const options = {
      hostname: 'slack.com',
      port: 443,
      path: '/api/chat.postMessage',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length,
        'Authorization': 'Bearer '+SLACK_BOT_TOKEN
      }
    }
    
    const req = https.request(options, (res) => {
      console.log(`statusCode: ${res.statusCode}`)
    
      res.on('data', (d) => {
        process.stdout.write(d);
      })
    })
    
    req.on('error', (error) => {
      console.error(error);
    })
    
    req.write(data);
    req.end();
  } catch (error) {
    core.setFailed(error.message);
  }
}

run()
