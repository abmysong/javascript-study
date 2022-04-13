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

const membersCreate = function(form) {
  const inputTextObject = form['input-text'];
  const value = inputTextObject.value.trim();
  if (value === '') {
    alert('공백은 입려할 수 없습니다.');
    return;
  }
  members.push(value);
  membersSet(members);
  inputTextObject.value = '';
  inputTextObject.focus();
  return membersRead();
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
  members[index] = document.getElementsByName('members-name')[0].value;
  membersSet(members);
  return membersRead();
};

membersRead();

