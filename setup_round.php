<?php
    include('_base/includes/config.php');
    include('_base/includes/templates/html_head.php');
?>


    <title>Setup Round</title>


    <script type="text/javascript" src="_base/js/jquery-ui-1.7.2.dragdrop.min.js" charset="utf-8"></script>

    <script type="text/javascript" src="_base/js/setup_round.js" charset="utf-8"></script>

</head>
<body class="setup_round">

    
    <div id="wrap">
        <h1>Setup Round</h1>
        

        <section id="people">
            <?php foreach ($people as $person): ?>
                <div id="holder_<?= $person ?>" class="person dropbox">
                    <div class="person draggee"><strong><?= $person ?></strong></div>
                </div>
            <?php endforeach; ?>
        </section>
    
        <section id="players">
            <?php for ($i=1; $i <= 4; $i++): ?>
                <article id="player<?= $i ?>">
                    <div class="person dropbox"></div>
                    <div class="avatar dropbox"></div>
                </article>
            <?php endfor; ?>
        </section>

        <section id="character_pool">
            <?php foreach ($characters as $character):?>
                <div id="holder_<?= cleanURL($character) ?>" class="dropbox avatar">
                    <div class="avatar character draggee <?= cleanURL($character) ?>">
                        <div><img src="_base/img/character_avatars.png" alt="<?= $player->character ?>" /></div>
                        <label><?= $character ?></label>
                    </div>
                </div>
            <?php endforeach; ?>
            
        </section>
        
        
        <button id="reset" >Reset</button>
        
        <table>
            <tr>
                <th scope="row">Player</th>
                <td></td>
                <?php for ($i=1; $i <= 4; $i++): ?>
                    <td>
                        <?php selectOptions($i, $people, 'person', ''); ?>
                    </td>
                <?php endfor; ?>
            </tr>
            <tr>
                <th scope="row">Character</th>
                <td></td>
                <?php for ($i=1; $i <= 4; $i++): ?>
                    <td>
                        <?php selectOptions($i,  $characters, 'character', ''); ?>
                    </td>
                <?php endfor; ?>                
            </tr>
            <tr>
                <th scope="row">Vehicle</th>
                <td></td>
                <?php for ($i=1; $i <= 4; $i++): ?>
                    <td>
                        <?php $id = 'player' . $i . '_vehicle'; ?>
                        <select name="<?= $id ?>" id="<?= $id ?>" class="vehicle">
                            <option value="---">---</option>
                            <?php foreach ($allVehicles as $vehicleClass => $vehicles): ?>
                                <optgroup label="<?= $vehicleClass ?>">
                                <?php foreach ($vehicles as $vehicle): ?>
                                    <option value="<?= $vehicle ?>"><?= $vehicle ?></option>
                                <?php endforeach; ?>
                                </optgroup>
                            <?php endforeach; ?>
                        </select>
                    </td>
                <?php endfor; ?>                
            </tr>
        </table>

    </div> <!-- /#wrap -->

    
</body>
</html>