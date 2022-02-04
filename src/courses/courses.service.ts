import { HttpException, Injectable } from '@nestjs/common';
import { throws } from 'assert';
import { resolve } from 'path/posix';
import { COURSES } from './courses.mock';

@Injectable()
export class CoursesService {
    courses = COURSES; // to import the COURSE constant as a class attribute

    getCourses(): Promise<any> {
        return new Promise(resolve => {
            resolve(this.courses);
        })
    }

    getCourse(courseId): Promise<any> {
        let id = Number(courseId);
        return new Promise(resolve => {
            const course = this.courses.find(course => course.id === id);
            if (!course)
                throw new HttpException('Course does not exist', 404);
            resolve(course);
        });
    }

    addCourse(course): Promise<any> {
        return new Promise(resolve => {
            this.courses.push(course);
            resolve(this.courses);
        })
    }

    deleteCourse(courseId): Promise<any> {
        let id = Number(courseId);
        return new Promise(resolve => {
            let index = this.courses.findIndex(course => course.id === id);
            if (index === -1)
                throw new HttpException('Course does not exist', 404)
            this.courses.splice(index, 1);
            resolve(this.courses);
        })
    }

}
