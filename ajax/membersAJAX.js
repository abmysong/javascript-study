const queryString = new URLSearchParams(window.location.search);
const nameText = queryString.get('input-text');
// const inputTextObjects = document.getElementsByName('input-text');
// const inputTextObject = inputTextObjects[0];

// const inputTextObject = document.getElementsByName('input-text')[0];
// inputTextObject.value = nameText;
// const inputHiddens = queryString.getAll('input-hidden');
// const inputHidden = inputHiddens[0];

// inputTextObject.focus();
// inputTextObject.blur();

const membersGet = sessionStorage.getItem('members');
const membersLogical = membersGet || '[]';
const members = JSON.parse(membersLogical);

const membersSet = function(members) {
  const membersSet = JSON.stringify(members);
  sessionStorage.setItem('members', membersSet);
  // window.location.reload();
};

const membersCreate = function(form) {
  const memberNameObject = form['member-name'];
  const memberAgeObject = form['member-age'];
  const member = {
    name: memberNameObject.value,
    age: memberAgeObject.value
  };
  const successFunction = function() {
    memberNameObject.value = '';
    memberAgeObject.value = '';
    membersRead();
  }
  const xhrObject = new XMLHttpRequest();
  xhrObject.onreadystatechange = function() {
    if (xhrObject.readyState !== 4) return;
    if (xhrObject.status === 200) {
      successFunction();
    } else {
      const error = {
        status: xhrObject.status,
        statusText: xhrObject.statusText,
        responseText: xhrObject.responseText
      }
      console.error(error);
    }
  };
  xhrObject.open('POST', 'http://localhost:3100/api/v1/members');
  xhrObject.setRequestHeader('Content-Type', 'application/json');
  xhrObject.send(JSON.stringify(member));
};

// const membersRead = function() {
//   const tagPre = document.getElementById('tag-pre');
//   tagPre.innerHTML = '';
//   for (let index in members) {
//     tagPre.innerHTML += '<input type="text" name="members-name" value="' + members[index] + '">';
//     tagPre.innerHTML += '<button onclick="membersUpdate(' + index + ')">Update</button>'
//     tagPre.innerHTML += '<button onclick="membersDelete(' + index + ')">Delete</button>';
//     tagPre.innerHTML += '\n';
//   }
//   console.log('Readed', members);
// };

const membersRead = function() {
  const tagDivParent = document.getElementById('tag-div-parent');
  tagDivParent.innerHTML = '';
  const tagDivChild = document.getElementById('tag-div-child');
  for (let index in members) {
    const newDivChild = tagDivChild.cloneNode(true);
    tagDivParent.appendChild(newDivChild);
    const membersNameObject = document.getElementsByName('members-name')[index];
    const membersAgeObject = document.getElementsByName('members-age')[index];
    const membersUpdateObject = document.getElementsByName('members-update')[index];
    const membersDeleteObject = document.getElementsByName('members-delete')[index];
    membersNameObject.value = members[index].name;
    membersAgeObject.value = members[index].age;
    membersUpdateObject.index = index;
    membersDeleteObject.index = index;
  }
  console.log('Readed', members);
  return members;
};

const membersDelete = function(index) {
  members.splice(index, 1);
  membersSet(members);
  // return 'Deleted';
  return membersRead();
};

const membersUpdate = function(index) {
  // members[index] = document.getElementsByName('members-name')[index].value;
  const member = {
    name: document.getElementsByName('members-name')[index].value,
    age: document.getElementsByName('members-age')[index].value
  };
  members[index] = member;
  membersSet(members);
  return membersRead();
};

membersRead();

