-- Assignment1: Handle pause state

PauseState = Class{__includes = BaseState}

function PauseState:init()
    sounds['pause']:play()
    sounds['music']:pause()
end

function PauseState:enter(params)
    self.bird = params.bird
    self.pipePairs = params.pipePairs
    self.timer = params.timer
    self.score = params.score
end

function PauseState:update(dt)
    if love.keyboard.wasPressed('p') then
        gStateMachine:change('play', {
            bird = self.bird,
            pipePairs = self.pipePairs,
            timer = self.timer,
            score = self.score
        })
    end
end

function PauseState:render()
    love.graphics.rectangle('fill', VIRTUAL_WIDTH / 2 - 25, VIRTUAL_HEIGHT / 2 - 30, 20, 60)
    love.graphics.rectangle('fill', VIRTUAL_WIDTH / 2 + 5, VIRTUAL_HEIGHT / 2 - 30, 20, 60)
end

function PauseState:exit()
    sounds['pause']:stop()
    sounds['music']:resume()
end
