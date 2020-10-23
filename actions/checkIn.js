var request = require('request');

function youzanMahua () {
  var options = {
    'method': 'POST',
    'url': 'https://shop18582370.youzan.com/v2/apps/checkin/checkin.json',
    'headers': {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Cookie': 'DO_CHECK_YOU_VERSION=1; KDTSESSIONID=YZ759899910119358464YZPaKRzsc6; yz_log_uuid=d6b024c4-f677-580d-b088-c938c7c67565; nobody_sign=YZ759899910119358464YZPaKRzsc6; _kdt_id_=18390202; yz_log_seqn=2; yz_log_seqb=1603280654074; _canwebp=1; trace_sdk_context_is_share=1; yz_ep_page_track=28ai1KqyuibaAmRO%2BfN1hA%3D%3D; yz_ep_view_track=yUYFZuRvvWchWr7X3HBJ6g%3D%3D; yz_log_ftime=1601215859117; yz_ep_page_type_track=iDJ3GNJDHbhHtOl6W3j3ZA%3D%3D'
    },
    form: {'alias': '1cipwl43k' }
  };

  return new Promise(((resolve, reject) => {
    request(options, function (error, response) {
      if (error) throw new Error(error);
      console.log(response.body);
    });
  }))
}

function fiveZero () {
  var options = {
    'method': 'POST',
    'url': 'https://00000.host/user/checkin',
    'headers': {
      'referer': 'https://00000.host/user',
      'Cookie': 'lang=zh-cn; uid=99; ip=7b1dcd49063e22bd4b2b61986ba67dfe; email=www.onesway@gmail.com; key=23cac3c096f66c858015bab795fd811f6b6962468c495; expire_in=1603681012'
    }
  };

  return new Promise(((resolve, reject) => {
    request(options, function (error, response) {
      if (error) throw new Error(error);
      console.log(response.body);
    });
  }))
}

function chamtime () {
  var options = {
    'method': 'PUT',
    'url': 'https://api.techmall.chamshare.cn/daysign/sign',
    'headers': {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({"access_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MDMyODExNDMsIm5iZiI6MTYwMzI4MTE0MywiZXhwIjoxNjE4ODMzMTQzLCJkYXRhIjp7Im1lbWJlcl9pZCI6MTMzMjQ2OCwic2Vzc2lvbl9rZXkiOiJHc2VmSGt6NDR1alEydFQ3bTBWSWRBPT0ifX0.aaZYTfs_PB5wtWCiqNRtzw8sbnhULcUo5WFo_QpTLhg"})
  };
  return new Promise(((resolve, reject) => {
    request(options, function (error, response) {
      if (error) throw new Error(error);
      console.log(response.body);
    });
  }))
}

async function checkIn () {
  await youzanMahua();
  await fiveZero();
  await chamtime();
}

module.exports = checkIn;
