const queryString = new URLSearchParams(window.location.search);
const nameText = queryString.get('input-text');
// const inputTextObjects = document.getElementsByName('input-text');
// const inputTextObject = inputTextObjects[0];

const inputTextObject = document.getElementsByName('input-text')[0];
inputTextObject.value = nameText;
const inputHiddens = queryString.getAll('input-hidden');
const inputHidden = inputHiddens[0];

inputTextObject.focus();
inputTextObject.blur();

const membersGet = sessionStorage.getItem('members');
const membersLogical = membersGet || '[]';
const members = JSON.parse(membersLogical);

const membersSet = function(members) {
  const membersSet = JSON.stringify(members);
  sessionStorage.setItem('members', membersSet);
  // window.location.reload();
};

const membersCreate = function(member) {
  members.push(member);
  membersSet(members);
  return 'Created';
};

const membersRead = function() {
  const tagPre = document.getElementById('tag-pre');
  tagPre.innerHTML = '';
  for (let index in members) {
    tagPre.innerHTML += '<input type="text" name="members-name" value="' + members[index] + '">';
    tagPre.innerHTML += '<button onclick="membersUpdate(' + index + ')">Update</button>'
    tagPre.innerHTML += '<button onclick="membersDelete(' + index + ')">Delete</button>';
    tagPre.innerHTML += '\n';
  }
  console.log('Readed', members);
};

const membersDelete = function(index) {
  members.splice(index, 1);
  membersSet(members);
  // return 'Deleted';
  return membersRead();
};

const membersUpdate = function(index) {
  members[index] = document.getElementsByName('members-name')[0].value;
  membersSet(members);
  return membersRead();
};

const membersSubmit = function(event, form) {
  const inputTextObject = form['input-text'];
  try {
    const evalReturn = eval(inputTextObject.value);
    console.log(evalReturn);
  } catch(error) {
    console.error(error);
    alert(error);
    event.preventDefault();
  }
}

membersRead();

