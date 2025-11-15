let lastPrimary = 0;
let lastSecondary = 0;

function addPrimary() {
    const lastPrimaryFill = document.getElementById(`theme-primary-fill-${lastPrimary}`).value;
    const lastPrimaryOutline = document.getElementById(`theme-primary-outline-${lastPrimary}`).value;

    lastPrimary++;

    const wrapper = document.getElementById('primary-container');
    const newDiv = document.createElement('div');

    newDiv.className = 'join w-full';

    newDiv.innerHTML = `
        <div class="w-full">
            <label class="label" for="theme-primary-fill-${lastPrimary}">${lastPrimary + 1}. Fill Stop</label>
            <input id="theme-primary-fill-${lastPrimary}" type="color" class="input join-item" value="${lastPrimaryFill}">
        </div>
        <div class="w-full">
            <label class="label" for="theme-primary-outline-${lastPrimary}">${lastPrimary + 1}. Outline Stop</label>
            <input id="theme-primary-outline-${lastPrimary}" type="color" class="input join-item" value="${lastPrimaryOutline}">
        </div>
    `;

    wrapper.appendChild(newDiv);
}

function addSecondary() {
    const lastSecondaryFill = document.getElementById(`theme-secondary-fill-${lastSecondary}`).value;
    const lastSecondaryOutline = document.getElementById(`theme-secondary-outline-${lastSecondary}`).value;

    lastSecondary++;

    const wrapper = document.getElementById('secondary-container');
    const newDiv = document.createElement('div');

    newDiv.className = 'join w-full';

    newDiv.innerHTML = `
        <div class="w-full">
            <label class="label" for="theme-secondary-fill-${lastSecondary}">${lastSecondary + 1}. Fill Stop</label>
            <input id="theme-secondary-fill-${lastSecondary}" type="color" class="input join-item" value="${lastSecondaryFill}">
        </div>
        <div class="w-full">
            <label class="label" for="theme-secondary-outline-${lastSecondary}">${lastSecondary + 1}. Outline Stop</label>
            <input id="theme-secondary-outline-${lastSecondary}" type="color" class="input join-item" value="${lastSecondaryOutline}">
        </div>
    `;

    wrapper.appendChild(newDiv);
}

function onChangeType(event) {
    const value = event.value;
    const containerPrimary = document.getElementById('add-primary-button');
    const containerSecondary = document.getElementById('add-secondary-button');

    if (value === 'Solid') {
        containerPrimary.classList.add('hidden');
        containerSecondary.classList.add('hidden');

        while (lastPrimary > 0) {
            const wrapper = document.getElementById('primary-container');
            wrapper.removeChild(wrapper.lastChild);
            lastPrimary--;
        }

        while (lastSecondary > 0) {
            const wrapper = document.getElementById('secondary-container');
            wrapper.removeChild(wrapper.lastChild);
            lastSecondary--;
        }
    } else {
        containerSecondary.classList.remove('hidden');
        containerPrimary.classList.remove('hidden');
    }
}

function downloadJson() {
    const json = getJson();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const downloadLink = document.createElement('a');
    downloadLink.href = url;

    const name = document.getElementById('theme-name').value.replace(/ /g, '_');

    downloadLink.download = name + '.json';

    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(url);
}

function getJson() {
    const theme = {};

    theme.displayName = document.getElementById('theme-name').value;
    theme.author = document.getElementById('theme-author').value;
    theme.description = document.getElementById('theme-description').value;
    theme.type = document.getElementById('theme-type').value.toUpperCase();

    theme.primaryColors = [];
    theme.secondaryColors = [];

    for (let i = 0; i <= lastPrimary; i++) {
        const fill = document.getElementById(`theme-primary-fill-${i}`).value.replace('#', '0x').toUpperCase();
        const outline = document.getElementById(`theme-primary-outline-${i}`).value.replace('#', '0x').toUpperCase();
        theme.primaryColors.push({ fill, outline });
    }

    for (let i = 0; i <= lastSecondary; i++) {
        const fill = document.getElementById(`theme-secondary-fill-${i}`).value.replace('#', '0x').toUpperCase();
        const outline = document.getElementById(`theme-secondary-outline-${i}`).value.replace('#', '0x').toUpperCase();
        theme.secondaryColors.push({ fill, outline });
    }

    const disabledFill = document.getElementById('theme-disabled-fill').value.replace('#', '0x').toUpperCase();
    const disabledOutline = document.getElementById('theme-disabled-outline').value.replace('#', '0x').toUpperCase();

    theme.disabledColor = { fill: disabledFill, outline: disabledOutline };

    const backgroundFill = document.getElementById('theme-background-fill').value.replace('#', '0x').toUpperCase();
    const backgroundOutline = document.getElementById('theme-background-outline').value.replace('#', '0x').toUpperCase();

    theme.backgroundColor = { fill: backgroundFill, outline: backgroundOutline };

    theme.textColor = document.getElementById('theme-text-color').value.replace('#', '0x').toUpperCase();

    return JSON.stringify(theme, null, 2);
}