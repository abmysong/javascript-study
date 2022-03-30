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
  for (let index in members) {
    document.writeln(members[index]);
  };
};

const membersDelete = function(index) {
  members.splice(index, 1);
  membersSet(members);
  return 'Deleted';
};

const membersUpdate = function(index, member) {
  members[index] = member;
  membersSet(members);
  return 'Updated';
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
