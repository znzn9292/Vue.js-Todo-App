<template>
    <div>
        <button @click="createTodo">
            <span class="material-icons">add</span>
        </button>
        <input 
            :value="title"
            :placeholder="placeholder"
            type="text" 
            @input="title = $event.target.value"
            @keypress.enter="createTodo"
        />
    </div>

</template>

<script>
export default {
    data () {
        return {
            title: '',
            placeholder: '할 일을 추가하세요.'

        }
    },
    methods: {
        // 할 일 생성
        createTodo () {
            const validatedTitle = this.title && this.title.trim()
            if(!validatedTitle) {
                alert('유효하지 않은 제목입니다.')
                this.title = this.title.trim()
                return 
            }

            // $emit: 부모 컴포넌트에게 특정한 이벤트를 올림
            this.$emit('create-todo', this.title)
            this.title = ''

            // 
            this.$nextTick(() => {
                window.scrollTo(0, document.body.scrollHeight)
            })
        }
    }
}
</script>